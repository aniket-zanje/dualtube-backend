const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');

const { askOpenRouter } = require('./openrouter');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: '*' }));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('DualTube AI Backend is running...');
});

app.post('/gemini', async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({ answer: 'Invalid prompt format.' });
    }

    const answer = await askOpenRouter(prompt);
    res.json({ answer });

  } catch (error) {
    console.error('Server error:', error.message);
    res.status(500).json({ answer: 'AI failed to respond. Try again later.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});