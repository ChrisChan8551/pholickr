import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import './ChatBox.css'

let socket;

const ChatBox = () => {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [chatInput, setChatInput] = useState("");
    const [messages, setMessages] = useState([]);
    const user = useSelector((state) => state.session.user);
    const openForm = () => {
        setIsFormOpen(true);
    };

    const closeForm = () => {
        setIsFormOpen(false);
    };
    useEffect(() => {
        // create websocket/connect
        socket = io();

        // listen for chat events
        socket.on("chat", (chat) => {
            // when we receive a chat, add it into our messages array in state
            setMessages((messages) => [...messages, chat]);
        });

        // when component unmounts, disconnect
        return () => {
            socket.disconnect();
        };
    }, []);

    const sendChat = (e) => {
        e.preventDefault();
        // emit a message
        if (!chatInput) {
            alert("Please enter a message");
        } else if (chatInput.length > 100) {
            alert("Message is too long");
        } else {
            // console.log(messages, " <---- messages");
            socket.emit("chat", {
                user: user.username,
                msg: chatInput,
                // time: getLocaleTimeString(),
            });
        }
        // clear the input field after the message is sent
        setChatInput("");
    };
    return (
        <>
            {isFormOpen && (
                <div className="chat-popup" id="myForm">
                    <form className="form-container">
                        {/* <form action="/action_page.php" className="form-container"> */}
                        <h1>Chat</h1>

                        <label htmlFor="msg"><b>Message</b></label>
                        <textarea
                            type="text"
                            placeholder="Type message.."
                            name="msg"
                            value={chatInput}
                            onChange={(e) => setChatInput(e.target.value)}
                            required
                        >
                        </textarea>

                        <button type="submit" className="btn">Send</button>
                        <button type="button" className="btn cancel" onClick={closeForm}>Close</button>
                    </form>


                </div>
            )}

            {!isFormOpen && (
                <button className="open-button" onClick={openForm}>Open Chat</button>
            )}
        </>
    );
}

export default ChatBox
