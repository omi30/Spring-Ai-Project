import React, { useState } from "react";

function ImageGenerator() {
    const [prompt, setPrompt] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [loading, setLoading] = useState(false);

    const generateImage = () => {
        if (!prompt.trim()) return;
        setLoading(true);
        setImageUrl('');
        const encoded = encodeURIComponent(prompt);
        const url = `https://image.pollinations.ai/prompt/${encoded}?width=768&height=768&nologo=true&seed=${Date.now()}`;
        setImageUrl(url);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') generateImage();
    };

    return (
        <div className="card">
            <p className="section-title">Image Generator</p>
            <p className="section-subtitle">Describe what you want to see and we will generate it</p>

            <div className="input-row">
                <input
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="A mountain landscape at dusk"
                />
                <button className="btn-primary" onClick={generateImage} disabled={loading}>
                    {loading ? 'Generating...' : 'Generate'}
                </button>
            </div>

            {!imageUrl && !loading && (
                <div className="empty-state">
                    Your image will appear here
                </div>
            )}

            {loading && (
                <p className="status-text">Generating your image, this may take a few seconds...</p>
            )}

            {imageUrl && (
                <div className="image-wrap">
                    <img
                        src={imageUrl}
                        alt="Generated result"
                        onLoad={() => setLoading(false)}
                        onError={() => setLoading(false)}
                    />
                </div>
            )}
        </div>
    );
}

export default ImageGenerator;
