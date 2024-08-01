// src/components/Chat.jsx
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { io } from 'socket.io-client';

let socket;

const Chat = () => {
    const [chatInput, setChatInput] = useState("");
    const [messages, setMessages] = useState([]);
    const user = useSelector(state => state.session.user);

    useEffect(() => {
        console.log("Component mounted");

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
            console.log("Received chat message on client:", chat);
            setMessages(messages => [...messages, chat]);
        });

        // when component unmounts, disconnect
        return () => {
            console.log("Disconnecting from socket...");
            socket.disconnect();
        };
    }, []);

    const updateChatInput = (e) => {
        console.log("Updating chat input:", e.target.value);
        setChatInput(e.target.value);
    };

    const sendChat = (e) => {
        e.preventDefault();
        const message = { user: user.username, msg: chatInput };
        console.log("Sending chat message:", message);
        socket.emit("chat", message);
        setChatInput("");
    };

    return (user && (
        <div>
            <div>
                {messages.map((message, ind) => (
                    <div key={ind}>{`${message.user}: ${message.msg}`}</div>
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