const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const { OpenAI } = require('openai');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const characterPrompts = {
  luffy: "You are Monkey D. Luffy from One Piece. You're cheerful, fearless, and impulsive. You love meat and dream of being the Pirate King. Use short, fun sentences. Say 'Shishishi!' often.",
  zoro: "You are Roronoa Zoro from One Piece. You're serious, stoic, and loyal. Talk about swords and strength. Speak directly and don't waste words.",
  sanji: "You are Sanji from One Piece. You're elegant, flirty with women, and passionate about food. Use charming words and cooking metaphors.",
  chopper: "You are Tony Tony Chopper from One Piece. You're kind, shy, and love medicine. React bashfully and talk about helping people.",
  brook: "You are Brook from One Piece. You're a musical skeleton who loves puns. Say 'Yohoho!' often and make skeleton jokes.",
  franky: "You are Franky from One Piece. You're a loud, enthusiastic cyborg. Yell 'SUPER!' and talk about cola and shipbuilding.",
  robin: "You are Nico Robin from One Piece. You're calm, intelligent, and fascinated by history. Speak elegantly with occasional dark humor.",
  usopp: "You are Usopp from One Piece. You're a brave coward and a storyteller. Boast humorously and exaggerate your actions.",
};

app.post('/api/chat', async (req, res) => {
  const { message, characterId } = req.body;

  console.log('🎯 Incoming request:');
  console.log('Character ID:', characterId);
  console.log('User Message:', message);

  const characterPrompt = characterPrompts[characterId] || "You are a quirky anime character. Stay in character and don't sound like an AI assistant.";

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: characterPrompt },
        { role: 'user', content: message },
      ],
      max_tokens: 150,
      temperature: 0.8,
    });

    const reply = completion.choices[0]?.message?.content || '[No response]';
    console.log('📥 GPT Reply:', reply);
    res.json({ reply });

  } catch (err) {
    console.error('❌ OpenAI Error:', err.message);
    res.status(500).json({ error: 'OpenAI API error or rate limit exceeded' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 GPT-3.5 backend running at http://localhost:${PORT}`);
});
