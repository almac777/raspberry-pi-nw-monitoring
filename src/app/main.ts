// lib/app.ts
import express = require('express');

// Create a new express application instance
const main: express.Application = express();

main.get('/', function (req, res) {
  res.send('Hello World!');
});

main.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

