const fetch = require('node-fetch');

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';

async function askOpenRouter(prompt) {
  console.log(OPENROUTER_API_KEY);
  try {
    const response = await fetch(OPENROUTER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'mistralai/mistral-7b-instruct',
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    const data = await response.json();

    if (response.ok && data.choices?.[0]?.message?.content) {
      return data.choices[0].message.content;
    } else {
      console.error('OpenRouter API error:', data);
      return 'AI could not generate a valid response.';
    }

  } catch (err) {
    console.error('OpenRouter request failed:', err.message);
    return 'Network or server error. Try again.';
  }
}

module.exports = { askOpenRouter };