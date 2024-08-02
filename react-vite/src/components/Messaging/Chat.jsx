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
    const [dropdownOpen, setDropdownOpen] = useState(null); // <-- updated for dropdown
    const messagesEndRef = useRef(null); // <-- useRef to scroll to the bottom
    const dropdownRef = useRef(null); // <-- ref to track the dropdown menu

    useEffect(() => {
        if (!currentChannel) {
            console.error("No current channel provided");
            return;
        }

        // open socket connection
        const socketUrl = process.env.NODE_ENV === 'production' ? 'https://elya-le-banter.onrender.com' : 'http://localhost:5001';
        socket = io(socketUrl);

        socket.on("connect", () => {
        });

        socket.on("connect_error", (err) => {
            console.error("Connection error:", err);
        });

        socket.on("chat", (chat) => {
            if (chat.channel_id === currentChannel.id) {  // <-- make sure to use channel_id
                setMessages(messages => [...messages, chat]);
            }
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
                    created_at: new Date(message.created_at).toISOString(),  // <-- ensure correct date format
                    id: message.id  // <-- include message ID for deletion
                })); // <-- map backend message structure to frontend structure
                setMessages(mappedMessages);  // <-- this has been updated to map messages
                scrollToBottom(); // <-- scroll to the bottom after fetching messages
            } catch (error) {
                console.error("Failed to fetch messages:", error);
            }
        };

        fetchMessages();
    }, [currentChannel]);

    useEffect(() => {
        scrollToBottom(); // <-- scroll to the bottom when messages change
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

            // save message to the database
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
        return format(new Date(dateString), 'MM/dd/yyyy hh:mm a'); // <-- use date-fns to format the date
    };

    const handleDeleteMessage = async (messageId) => {
        try {
            await fetch(`/api/channels/messages/${messageId}`, {
                method: "DELETE"
            });
            setMessages(messages.filter(message => message.id !== messageId));  // <-- update state after deletion
        } catch (error) {
            console.error("Failed to delete message:", error);
        }
    };

    const toggleDropdown = (messageId) => {
        setDropdownOpen(dropdownOpen === messageId ? null : messageId);  // <-- toggle dropdown state
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setDropdownOpen(null);  // <-- close the dropdown if click is outside
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    if (!currentChannel) {
        return <div className="chat-error">Please select a channel to view the chat.</div>;  // <-- added class
    }

    return (user && (
        <div className="chat-container">  
            <div className="chat-messages">  
                {messages.map((message, ind) => (
                    <div key={ind} className="chat-message">  
                        <div className="chat-message-header">  
                            <div className="name-date">
                              <strong className="chat-message-user">{message.user}</strong> 
                              <span className="chat-message-date">{formatDate(message.created_at)}</span>  {/* <-- added classes */}
                            </div>
                            {user.username === message.user && (
                                <div className="message-actions-container" ref={dropdownRef}>
                                    <a href="#" className="message-actions-link" onClick={(e) => { e.preventDefault(); toggleDropdown(message.id); }}>
                                        ...
                                    </a>
                                    {dropdownOpen === message.id && (
                                        <ul className="message-dropdown-menu">
                                            <li onClick={() => handleDeleteMessage(message.id)} className="server-dd-hover">Delete Message</li>
                                        </ul>
                                    )}
                                </div>
                            )}
                        </div>
                        <div className="chat-message-content"> 
                            {message.msg}  {/* <-- display message content on the next line */}
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} /> {/* <-- added div to scroll to */}
            </div>
            <form className="chat-input-form">  
                <input
                    className="chat-input"  // <-- added class
                    value={chatInput}
                    onChange={updateChatInput}
                    onKeyDown={sendChat} // <-- handle key down event to send message on enter
                    placeholder={`Message #${currentChannel.name}`}  // <-- add placeholder text
                />
            </form>
        </div>
    ));
};

export default Chat;
