const express = require('express');
const { OpenAI } = require('openai');
const dotenv=require('dotenv');
const cors=require('cors')
dotenv.config();
const app = express();
const port = process.env.PORT ||3000;

const apiKey = process.env.apiKey;
const baseURL ='https://api.aimlapi.com/v1';

const api = new OpenAI({
  apiKey,
  baseURL,
});
app.use(cors());
app.use(express.json())

app.post('/generate-response', async (req, res) => {
  const { systemPrompt, userPrompt } = req.body;

  try {
    const completion = await api.chat.completions.create({
      model: 'mistralai/Mistral-7B-Instruct-v0.2',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.7,
      max_tokens: 256,
    });

    const response = completion.choices[0].message.content;
    res.json({ userPrompt, response });
  } catch (error) {
    console.error('Error during API request:', error.message); 
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {

  console.log(`Server running at http://localhost:${port}`);
});
