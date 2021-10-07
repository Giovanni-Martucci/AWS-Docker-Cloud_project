const express = require('express')
const cors = require('cors');

const app = express();
const port = 4000;
const host = "0.0.0.0";

app.use(cors());
app.use(express.urlencoded({ extended: true }));   //sostituito a bodyparser
app.use(express.json());                           //sostituito a bodyparser




app.get('/temperature', (req, res) => {
  // comunicazione con arduino
  // let result = [{temperature : "100°", umidity: "30", ph: "11"},{temperature : "100°", umidity: "30", ph: "11"}, {temperature : "100°", umidity: "30", ph: "11"}];  Temperature[] *ngFor need
  let temperature = Math.floor(Math.random() * 100).toString();
  
  let result = {temperature: temperature};

  res.contentType('application/json');
  res.json(result);

})

app.listen(port, host);

console.log(`https://${host}:${port}/temperature`)

