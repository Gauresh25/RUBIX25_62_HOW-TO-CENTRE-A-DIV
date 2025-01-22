// client/src/components/Chat.js

import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const Chat = () => {
    const [message, setMessage] = useState('');
    const [conversation, setConversation] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    // Auto-scroll to bottom when new messages arrive
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [conversation]);

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!message.trim()) return;

        const userMessage = { sender: 'user', text: message };
        setConversation(prev => [...prev, userMessage]);
        setIsLoading(true);

        try {
            const response = await axios.post('http://localhost:5000/chat', {
                message: message
            });

            const botMessage = {
                sender: 'Rani Lakshmibai',
                text: response.data.reply
            };
            
            setConversation(prev => [...prev, botMessage]);
        } catch (error) {
            console.error('Error:', error);
            const errorMessage = {
                sender: 'system',
                text: 'I apologize, but I am unable to respond at the moment. Please try again later.'
            };
            setConversation(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
            setMessage('');
        }
    };

    return (
        <div className="chat-container" style={{
            maxWidth: '800px',
            margin: '0 auto',
            padding: '20px',
            fontFamily: 'Arial, sans-serif'
        }}>
            <div className="chat-messages" style={{
                height: '500px',
                overflowY: 'auto',
                border: '1px solid #ddd',
                borderRadius: '12px',
                padding: '20px',
                marginBottom: '20px',
                backgroundColor: '#f8f9fa'
            }}>
                {conversation.map((msg, index) => (
                    <div key={index} style={{
                        textAlign: msg.sender === 'user' ? 'right' : 'left',
                        marginBottom: '15px'
                    }}>
                        <div style={{
                            display: 'inline-block',
                            maxWidth: '70%',
                            padding: '12px 16px',
                            borderRadius: '18px',
                            backgroundColor: msg.sender === 'user' ? '#007bff' : '#e9ecef',
                            color: msg.sender === 'user' ? 'white' : 'black',
                            boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
                        }}>
                            {msg.sender !== 'user' && (
                                <div style={{
                                    fontSize: '0.8em',
                                    marginBottom: '4px',
                                    color: '#666'
                                }}>
                                    {msg.sender}
                                </div>
                            )}
                            {msg.text}
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div style={{ textAlign: 'left', marginBottom: '15px' }}>
                        <div style={{
                            display: 'inline-block',
                            padding: '12px 16px',
                            borderRadius: '18px',
                            backgroundColor: '#e9ecef',
                            color: '#666'
                        }}>
                            Typing...
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <form onSubmit={sendMessage} style={{
                display: 'flex',
                gap: '10px'
            }}>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Ask Rani Lakshmibai..."
                    style={{
                        flex: 1,
                        padding: '12px',
                        borderRadius: '24px',
                        border: '1px solid #ddd',
                        fontSize: '16px',
                        outline: 'none'
                    }}
                />
                <button
                    type="submit"
                    disabled={isLoading}
                    style={{
                        padding: '12px 24px',
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '24px',
                        fontSize: '16px',
                        cursor: 'pointer',
                        opacity: isLoading ? 0.7 : 1
                    }}
                >
                    Send
                </button>
            </form>
        </div>
    );
};

export default Chat;