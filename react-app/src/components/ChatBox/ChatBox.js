import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import './ChatBox.css'

let socket;

const ChatBox = () => {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [chatInput, setChatInput] = useState("");
    const [messages, setMessages] = useState([]);
    const user = useSelector((state) => state.session.user);
    const chatBoxRef = useRef(null);

    // const getLocaleDateTimeString = () => {
    //     let timestamp = new Date();
    //     const offset = timestamp.getTimezoneOffset() * 60000; // milliseconds
    //     const local = new Date(timestamp.getTime() - offset);
    //     return local.toISOString().slice(0, 19).replace("T", " ");
    // }

    // const getLocaleDateString = () => {
    //     // date only
    //     let timestamp = new Date();
    //     const offset = timestamp.getTimezoneOffset() * 60000; // milliseconds
    //     const local = new Date(timestamp.getTime() - offset);
    //     return local.toISOString().slice(0, 10);
    // }

    const getLocaleTimeString = () => {
        // time only
        let timestamp = new Date();
        const offset = timestamp.getTimezoneOffset() * 60000; // milliseconds
        const local = new Date(timestamp.getTime() - offset);

        // Get hours, minutes, and AM/PM indicator
        let hours = local.getHours();
        const minutes = local.getMinutes();
        const amOrPm = hours >= 12 ? 'PM' : 'AM';

        // Convert hours to 12-hour format
        hours = hours % 12 || 12;

        // Ensure minutes are displayed with leading zero if less than 10
        const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;

        // Construct the time string in 12-hour format
        return `${hours}:${formattedMinutes} ${amOrPm}`;
    }

    const openForm = () => {
        setIsFormOpen(true);
    };

    const closeForm = () => {
        setIsFormOpen(false);
    };
    useEffect(() => {
        if (chatBoxRef.current) {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
    }, [messages]);

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
                time: getLocaleTimeString(),
            });
        }
        // clear the input field after the message is sent
        setChatInput("");
    };
    return (
        <>
            {isFormOpen && (
                <div className="chat-popup" id="myForm">
                    <form className="form-container" onSubmit={sendChat}>
                        {/* <form action="/action_page.php" className="form-container"> */}
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
                        >
                        </textarea>

                        <button type="submit" className="btn">Send</button>
                        <button type="button" className="btn cancel" onClick={closeForm}>Close</button>
                    </form>


                </div>
            )}

            {!isFormOpen && (
                <div>
                    <img
                        src="/speech-bubble.png"
                        alt='pic'
                        className="open-pic"
                        onClick={openForm}
                        style={{ cursor: 'pointer' }}
                    />
                </div>
            )}
        </>
    );
}

export default ChatBox
