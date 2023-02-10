const express = require('express');
const request = require('request');

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/landing_page.html');
});

app.post('/', (req, res) => {
  const symbol = req.body.symbol;

  const url = `https://finance.yahoo.com/quote/${symbol}`;

  request(url, (error, response, html) => {
    if (!error && response.statusCode === 200) {
      res.send(html);
    } else {
      res.send('An error occurred. Please try again later.');
    }
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}.`);
});
