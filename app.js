const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;
const cors = require('cors');

const app = express();

app.use(cors());

app.get('/', (req, res) => {
  res.send("Hello World");
});

app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`),
);
