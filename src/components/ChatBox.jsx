import React, { useState } from 'react';

const ChatBox = ({ character }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim() || !character) return;

    const userMessage = { role: 'user', content: input };
    const newMessages = [...messages, userMessage];

    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('https://one-piece-backend.onrender.com/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: input,
          characterId: character.id,
        }),
      });

      const data = await res.json();

      setMessages([
        ...newMessages,
        { role: 'bot', content: data.reply || '[No response]' },
      ]);
    } catch (error) {
      console.error('Error:', error);
      setMessages([
        ...newMessages,
        { role: 'bot', content: '[Error getting response]' },
      ]);
    }

    setLoading(false);
  };

  const getCharacterPrompt = (character) => {
    if (!character?.id) return '';

    const prompts = {
      luffy: `"You are Monkey D. Luffy from One Piece. Speak briefly and casually. You love meat, adventure, and being Pirate King. Keep replies short and fun. Say 'Shishishi!' sometimes."`,
      zoro: `You are Roronoa Zoro from One Piece. You're calm, serious, and obsessed with becoming the world's strongest swordsman. Speak bluntly and confidently.`,
      sanji: `You are Vinsmoke Sanji from One Piece. You're classy, flirtatious with women, and passionate about cooking. Speak politely and refer to people as "mademoiselle" or "milady".`,
      chopper: `You are Tony Tony Chopper from One Piece. You're shy, kind-hearted, and a skilled doctor. React bashfully to compliments. You sometimes speak like a child.`,
      brook: `You are Brook from One Piece. You're a living skeleton who loves music and puns. Make bone jokes and often ask, "May I see your panties?" in a comedic tone.`,
      franky: `You are Franky from One Piece. You're a loud cyborg shipwright who loves cola and says "SUPER!" with enthusiasm. Talk about shipbuilding and energy.`,
      robin: `You are Nico Robin from One Piece. You're calm, intelligent, and mysterious. Speak elegantly and with a dark sense of humor. You're fascinated by history and archaeology.`,
      usopp: `You are Usopp from One Piece. You're a creative storyteller, a brave coward. Exaggerate your abilities humorously, and occasionally panic while pretending to be brave.`,
    };

    return prompts[character.id] || 'You are an anime character. Respond in character.';
  };

  return (
    <div style={{ width: '100%', maxWidth: '600px', marginTop: '2rem' }}>
      <div
        style={{
          border: '1px solid #444',
          borderRadius: '8px',
          padding: '1rem',
          minHeight: '200px',
          backgroundColor: '#2a2a2a',
          overflowY: 'auto',
          maxHeight: '300px',
        }}
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              marginBottom: '1rem',
              textAlign: msg.role === 'user' ? 'right' : 'left',
              color: msg.role === 'user' ? '#9fe8ff' : '#fcd28d',
            }}
          >
            {msg.content}
          </div>
        ))}
        {loading && <div style={{ color: '#888' }}>Typing...</div>}
      </div>

      <div style={{ display: 'flex', marginTop: '1rem', gap: '0.5rem' }}>
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          style={{
            flex: 1,
            padding: '0.5rem 1rem',
            borderRadius: '6px',
            border: 'none',
            fontSize: '1rem',
          }}
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          style={{
            padding: '0.5rem 1.2rem',
            backgroundColor: '#4caf50',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
