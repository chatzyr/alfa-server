const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(bodyParser.json());

// GET route for /listen
app.get('/listen', (req, res) => {
  console.log('Received GET request on /listen');
  res.send('GET request received');
});

// POST route for /listen
app.post('/listen', (req, res) => {
  console.log('Received POST request on /listen');
  console.log('Request body:', req.body);
  res.send('POST request received');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
