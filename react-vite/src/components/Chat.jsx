import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { io } from 'socket.io-client';

let socket;

const Chat = ({ currentChannel }) => {
    const [chatInput, setChatInput] = useState("");
    const [messages, setMessages] = useState([]);
    const user = useSelector(state => state.session.user);

    useEffect(() => {
        console.log("Component mounted");

        if (!currentChannel) {
            console.error("No current channel provided");
            return;
        }

        // open socket connection
        console.log("Connecting to socket...");
        socket = io("http://localhost:5001"); // <-- this has been updated to port 5001

        socket.on("connect", () => {
            console.log("Connected to socket");
        });

        socket.on("connect_error", (err) => {
            console.error("Connection error:", err);
        });

        socket.on("chat", (chat) => {
            if (chat.channel_id === currentChannel.id) {  // <-- make sure to use channel_id
                console.log("Received chat message on client:", chat);
                setMessages(messages => [...messages, chat]);
            }
        });

        // when component unmounts, disconnect
        return () => {
            console.log("Disconnecting from socket...");
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
                })); // <-- map backend message structure to frontend structure
                setMessages(mappedMessages);  // <-- this has been updated to map messages
            } catch (error) {
                console.error("Failed to fetch messages:", error);
            }
        };

        fetchMessages();
    }, [currentChannel]);

    const updateChatInput = (e) => {
        console.log("Updating chat input:", e.target.value);
        setChatInput(e.target.value);
    };

    const sendChat = (e) => {
        e.preventDefault();
        if (!currentChannel) {
            console.error("No current channel provided");
            return;
        }
        const message = { user: user.username, msg: chatInput, channel_id: currentChannel.id };
        console.log("Sending chat message:", message);
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
    };

    if (!currentChannel) {
        return <div>Please select a channel to view the chat.</div>;
    }

    return (user && (
        <div>
            <div>
                {messages.map((message, ind) => (
                    <div key={ind}>{`${message.user}: ${message.msg}`}</div>  // <-- use user and msg
                ))}
            </div>
            <form onSubmit={sendChat}>
                <input
                    value={chatInput}
                    onChange={updateChatInput}
                />
                <button type="submit">Send</button>
            </form>
        </div>
    ));
};

export default Chat;
