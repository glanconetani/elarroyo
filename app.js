const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.static(path.join(__dirname, 'client/build')));

// Put all API endpoints under '/api'
app.get('/api/signs', (req, res) => {
  const count = 2;

  // Generate some passwords
  const signs = [
    "TEST SIGN 1",
    "TEST SIGN 2"
  ]

  // Return them as json
  res.json(signs);

  console.log(`Sent ${count} signs`);
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`),
);
