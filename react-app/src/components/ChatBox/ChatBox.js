import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import './ChatBox.css';

let socket

const ChatBox = () => {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [chatInput, setChatInput] = useState("");
    const [messages, setMessages] = useState([]);
    const user = useSelector((state) => state.session.user);
    const chatBoxRef = useRef(null);


    const getLocaleTimeString = () => {
        const timestamp = new Date();
        return timestamp.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
    };

    const openForm = () => setIsFormOpen(true);

    const closeForm = () => setIsFormOpen(false);

    const scrollToBottom = () => {
        if (chatBoxRef.current) {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        socket = io();
        socket.on("chat", (chat) => {
            setMessages((prevMessages) => [...prevMessages, chat]);
        });
        return () => {
            socket.disconnect();
        };
    }, []);

    const sendChat = (e) => {
        e.preventDefault();
        if (!chatInput) {
            alert("Please enter a message");
            return;
        }
        if (chatInput.length > 100) {
            alert("Message is too long");
            return;
        }
        socket.emit("chat", {
            user: user.username,
            msg: chatInput,
            time: getLocaleTimeString(),
        });
        setChatInput("");
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <>
            {isFormOpen && (
                <div className="chat-popup" id="myForm">
                    <form className="form-container" onSubmit={sendChat}>
                        <h2>Chat</h2>
                        <div>
                            <ul className="chat-box-container" ref={chatBoxRef}>
                                {messages.map((message, ind) => (
                                    <li className="each-message" key={ind}>
                                        <div className="user-info">
                                            <span className="username">{message.user}</span>
                                            <span className="time">{message.time}</span>
                                        </div>
                                        <span className="message">{message.msg}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <label htmlFor="msg"><b>Message</b></label>
                        <textarea
                            type="text"
                            placeholder="Type message.."
                            name="msg"
                            value={chatInput}
                            onChange={(e) => setChatInput(e.target.value)}
                        ></textarea>
                        <button type="submit" className="btn">Send</button>
                        <button type="button" className="btn cancel" onClick={closeForm}>Close</button>
                    </form>
                </div>
            )}
            {!isFormOpen && (
                <div>
                    <img
                        src="/speech-bubble.png"
                        alt="pic"
                        className="open-pic"
                        onClick={openForm}
                        style={{ cursor: 'pointer' }}
                    />
                </div>
            )}
        </>
    );
};

export default ChatBox;
