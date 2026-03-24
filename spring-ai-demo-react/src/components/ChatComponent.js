import React, { useState } from "react";

function ChatComponent() {
    const [prompt, setPrompt] = useState('');
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);

    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

    const askAI = async () => {
        if (!prompt.trim()) return;
        setLoading(true);
        setResponse('');
        try {
            const res = await fetch(`${API_URL}/ask-ai?prompt=${encodeURIComponent(prompt)}`);
            const data = await res.text();
            setResponse(data);
        } catch (error) {
            setResponse('Something went wrong. Please check your connection and try again.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') askAI();
    };

    return (
        <div className="card">
            <p className="section-title">Chat</p>
            <p className="section-subtitle">Ask anything and get an instant answer</p>

            <div className="input-row">
                <input
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type your question here"
                />
                <button className="btn-primary" onClick={askAI} disabled={loading}>
                    {loading ? 'Thinking...' : 'Send'}
                </button>
            </div>

            {!response && !loading && (
                <div className="empty-state">
                    Your response will appear here
                </div>
            )}

            {loading && (
                <p className="status-text">Generating a response...</p>
            )}

            {response && (
                <div className="response-box">
                    {response}
                </div>
            )}
        </div>
    );
}

export default ChatComponent;
