import React, { useState } from 'react';
import './App.css';
import ImageGenerator from './components/ImageGenerator';
import ChatComponent from './components/ChatComponent';
import RecipeGenerator from './components/RecipeGenerator';

function App() {
  const [activeTab, setActiveTab] = useState('chat');

  return (
    <div className="App">
      <div className="app-header">
        <h1>EasyAI Hub</h1>
        <p>Chat with AI, generate images, and create recipes — all in one place</p>
      </div>

      <div className="tab-nav">
        <button
          className={activeTab === 'chat' ? 'active' : ''}
          onClick={() => setActiveTab('chat')}>
          Chat
        </button>
        <button
          className={activeTab === 'image-generator' ? 'active' : ''}
          onClick={() => setActiveTab('image-generator')}>
          Image Generator
        </button>
        <button
          className={activeTab === 'recipe-generator' ? 'active' : ''}
          onClick={() => setActiveTab('recipe-generator')}>
          Recipe Generator
        </button>
      </div>

      <div>
        {activeTab === 'chat' && <ChatComponent />}
        {activeTab === 'image-generator' && <ImageGenerator />}
        {activeTab === 'recipe-generator' && <RecipeGenerator />}
      </div>
    </div>
  );
}

export default App;
