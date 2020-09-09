const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'client/build')));

// Put all API endpoints under '/api'
app.get('/api/signs', (req, res) => {
  const count = 2;

  // Generate some passwords
  const previous = "BEST REALTOR ONE LINER: CAN YOU SEE YOURSELF QUARANTINING HERE?";
  const next = "I HEARD THE GOVERNMENT IS PUTTING CHIPS INSIDE PEOPLE. I HOPE I GET TORTILLA CHIPS!";

  // Return them as json
  res.json({ previous: previous, next: next });

  console.log(`Sent ${count} signs`);
});

app.post('/api/diff', (req, res) => {
  console.log(req.body.previous);
  console.log(req.body.next);

  let next = req.body.next.replace(/\s/g, "");
  let previous = req.body.previous;
  let remove = "";
  let pull = "";

  previous.split('').forEach((letter) => {
    if (letter != " ") {
      let index = next.indexOf(letter);
      if (index > -1) {
        next = next.replace(letter, '');
      } else {
        remove += letter;
      }
    }
  });

  console.log("Remove: " + remove);
  console.log("Pull: " + next);
  res.json({ pull: next, remove: remove });
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`),
);
