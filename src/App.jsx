import React, { useState } from 'react';
import CharacterSelector from './components/CharacterSelector';
import ChatBox from './components/ChatBox';

const App = () => {
  const [selectedCharacter, setSelectedCharacter] = useState({
    id: 'luffy',
    name: 'Luffy',
    img: '/luffy.png',
  });

  return (
    <div
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        backgroundImage: "url('/background.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Poppins',
        padding: '2rem',
        color: 'white',
        textAlign: 'center',
      }}
    >
      <h1 style={{ fontSize: '2.8rem', marginBottom: '1.5rem' }}>Anime Chatbot</h1>
      <CharacterSelector
        setSelectedCharacter={setSelectedCharacter}
        selectedCharacter={selectedCharacter}
      />
      <ChatBox character={selectedCharacter} />
    </div>
  );
};

export default App;
