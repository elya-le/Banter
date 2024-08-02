import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { io } from 'socket.io-client'; 
import { format } from 'date-fns'; // <-- import date-fns for date formatting
import './Chat.css'; // import the CSS file

let socket;

const Chat = ({ currentChannel }) => {
    const [chatInput, setChatInput] = useState("");
    const [messages, setMessages] = useState([]);
    const user = useSelector(state => state.session.user);
    const [dropdownOpen, setDropdownOpen] = useState(null); // updated for dropdown
    const [dropdownPosition, setDropdownPosition] = useState({}); // Track position of the dropdown
    const messagesEndRef = useRef(null); // useRef to scroll to the bottom
    const dropdownRefs = useRef({}); // Ref for each dropdown

    useEffect(() => {
        if (!currentChannel) {
            console.error("No current channel provided");
            return;
        }

        // open socket connection
        const socketUrl = process.env.NODE_ENV === 'production' ? 'https://elya-le-banter.onrender.com' : 'http://localhost:5001';
        socket = io(socketUrl);

        socket.on("connect", () => {});

        socket.on("connect_error", (err) => {
            console.error("Connection error:", err);
        });

        socket.on("chat", (chat) => {
            if (chat.channel_id === currentChannel.id) {
                setMessages(messages => [...messages, chat]);
            }
        });

        socket.on("messageDeleted", ({ messageId }) => {
            setMessages(messages => messages.filter(message => message.id !== messageId));
        });

        // when component unmounts, disconnect
        return () => {
            socket.disconnect();
        };
    }, [currentChannel]);

    useEffect(() => {
        if (!currentChannel) {
            console.error("No current channel provided");
            return;
        }

        // fetch initial messages for the current channel
        const fetchMessages = async () => {
            try {
                const response = await fetch(`/api/channels/${currentChannel.id}/messages`);
                const data = await response.json();
                const mappedMessages = data.map(message => ({
                    user: message.author.username,
                    msg: message.content,
                    channel_id: message.channel_id,
                    created_at: new Date(message.created_at).toISOString(),
                    id: message.id
                }));
                setMessages(mappedMessages);
                scrollToBottom();
            } catch (error) {
                console.error("Failed to fetch messages:", error);
            }
        };

        fetchMessages();
    }, [currentChannel]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const updateChatInput = (e) => {
        setChatInput(e.target.value);
    };

    const sendChat = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            if (!currentChannel) {
                console.error("No current channel provided");
                return;
            }
            const message = { user: user.username, msg: chatInput, channel_id: currentChannel.id, created_at: new Date().toISOString() };
            socket.emit("chat", message);

            const saveMessage = async () => {
                try {
                    await fetch(`/api/channels/${currentChannel.id}/messages`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ content: chatInput })
                    });
                } catch (error) {
                    console.error("Failed to save message:", error);
                }
            };

            saveMessage();

            setChatInput("");
        }
    };

    const formatDate = (dateString) => {
        return format(new Date(dateString), 'MM/dd/yyyy hh:mm a');
    };

    const handleDeleteMessage = async (messageId) => {
        try {
            await fetch(`/api/channels/messages/${messageId}`, {
                method: "DELETE"
            });
            setMessages(messages.filter(message => message.id !== messageId));
            socket.emit('messageDeleted', { messageId }); // Emit the event
        } catch (error) {
            console.error("Failed to delete message:", error);
        }
    };

    const toggleDropdown = (e, messageId) => {
        e.stopPropagation();
        const rect = e.target.getBoundingClientRect();
        setDropdownPosition({
            top: rect.top + window.scrollY,
            left: rect.left + window.scrollX - 230 // Adjusting left to position to the left of the link
        });
        setDropdownOpen(dropdownOpen === messageId ? null : messageId);
    };

    const handleClickOutside = (event) => {
        if (!dropdownRefs.current[dropdownOpen]?.contains(event.target)) {
            setDropdownOpen(null);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownOpen]);

    if (!currentChannel) {
        return <div className="chat-error">Please select a channel to view the chat.</div>;
    }

    return (user && (
        <div className="chat-container">  
            <div className="chat-messages">  
                {messages.map((message, ind) => (
                    <div key={ind} className="chat-message">  
                        <div className="chat-message-header">  
                            <div className="name-date">
                              <strong className="chat-message-user">{message.user}</strong> 
                              <span className="chat-message-date">{formatDate(message.created_at)}</span>
                            </div>
                            {user.username === message.user && (
                                <div className="message-actions-container">
                                    <a href="#" className={`message-actions-link ${dropdownOpen === message.id ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); toggleDropdown(e, message.id); }}>
                                        ...
                                    </a>
                                    {dropdownOpen === message.id && (
                                        <ul
                                            className="message-dropdown-menu"
                                            ref={el => (dropdownRefs.current[message.id] = el)}
                                            style={{ position: 'fixed', top: dropdownPosition.top, left: dropdownPosition.left }}
                                        >
                                            <li onClick={() => handleDeleteMessage(message.id)} className="server-dd-hover">Delete Message</li>
                                        </ul>
                                    )}
                                </div>
                            )}
                        </div>
                        <div className="chat-message-content"> 
                            {message.msg}
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <form className="chat-input-form">  
                <input
                    className="chat-input"
                    value={chatInput}
                    onChange={updateChatInput}
                    onKeyDown={sendChat}
                    placeholder={`Message #${currentChannel.name}`}
                />
            </form>
        </div>
    ));
};

export default Chat;
