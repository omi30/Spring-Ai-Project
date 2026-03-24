import React, { useState } from "react";

function ImageGenerator() {
    const [prompt, setPrompt] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [loading, setLoading] = useState(false);

    const generateImage = async () => {
        if (!prompt) return;
        setLoading(true);
        const encodedPrompt = encodeURIComponent(prompt);
        const url = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=512&height=512&nologo=true`;
        setImageUrl(url);
        setLoading(false);
    };

    return (
        <div className="tab-content">
            <h2>Generate Image</h2>
            <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter prompt for image"
            />
            <button onClick={generateImage}>Generate Image</button>
            <div className="image-grid">
                {loading && <p>Generating...</p>}
                {imageUrl && <img src={imageUrl} alt="Generated" />}
            </div>
        </div>
    );
}

export default ImageGenerator;