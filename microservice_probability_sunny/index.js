const express = require('express')
const cors = require('cors');

const app = express();
const port = 8000;
const host = '0.0.0.0';

app.use(cors());
app.use(express.urlencoded({ extended: true }));   //sostituito a bodyparser
app.use(express.json());                           //sostituito a bodyparser




app.get('/sunny', (req, res) => {
  // comunicazione con arduino
  let sunny = Math.floor(Math.random() * 100).toString();
  
  let result = {sunny: sunny};

  res.contentType('application/json');
  res.json(result);

})

app.listen(port, host);

console.log(`Hello world app listening on port ${host}:${port}!`);



