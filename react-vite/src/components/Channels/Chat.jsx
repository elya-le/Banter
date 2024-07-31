import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { io } from 'socket.io-client';

let socket;

const Chat = () => {
    const [chatInput, setChatInput] = useState("");
    const [messages, setMessages] = useState([]);
    const user = useSelector(state => state.session.user);

    useEffect(() => {
        console.log("Connecting to WebSocket...");
        socket = io("http://localhost:5000"); // Add the server URL here

        socket.on("connect", () => {
            console.log("WebSocket connection established");
        });

        socket.on("disconnect", () => {
            console.log("WebSocket connection closed");
        });

        socket.on("connect_error", (error) => {
            console.error("WebSocket connection error:", error);
        });

        socket.on("chat", (chat) => {
            console.log("Received chat message:", chat);
            setMessages(messages => [...messages, chat]);
        });

        return () => {
            console.log("Disconnecting WebSocket...");
            socket.disconnect();
        };
    }, []);

    const updateChatInput = (e) => {
        setChatInput(e.target.value);
    };

    const sendChat = (e) => {
        e.preventDefault();
        console.log("Sending chat message:", chatInput);
        socket.emit("chat", { user: user.username, msg: chatInput });
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
