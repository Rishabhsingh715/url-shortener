import express from 'express';
import { nanoid } from 'nanoid';

const app = express();
const PORT = process.env.PORT || 3007;

// Middleware to parse JSON body
app.use(express.json());

// In-memory database for storing URL mappings
const urlDatabase = {};

// Route to handle shortening URLs
app.post('/shorten', (req, res) => {
  const { longUrl } = req.body;
  const shortCode = nanoid(8); // Generate a short code of length 8
  urlDatabase[shortCode] = longUrl;
  const shortUrl = `http://localhost:${PORT}/${shortCode}`;
  res.json({ shortUrl });
});

// Route to handle redirects
app.get('/:shortCode', (req, res) => {
  const { shortCode } = req.params;
  const longUrl = urlDatabase[shortCode];
  if (longUrl) {
    res.redirect(longUrl);
  } else {
    res.status(404).send('URL not found');
  }

});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
