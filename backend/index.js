const express = require('express')
const cors = require('cors');
const https = require('https') //quando il microservizio sarà deployato effettivamente
const http = require('http');
const { resolve } = require('path');

const app = express();
const port = 3000;
const host = '0.0.0.0'


app.use(cors());
app.use(express.urlencoded({ extended: true }));   //sostituito a bodyparser
app.use(express.json());                           //sostituito a bodyparser


const options_temperature = {
  hostname: '172.31.7.75', // or 0.0.0.0 - temp
  port: 4000,
  path: '/temperature',
  method: 'GET'
}
const options_rain = {
  hostname: '172.31.7.75', // or 0.0.0.0 - umid
  port: 5000,
  path: '/rain',
  method: 'GET'
}
const options_sunny = {
  hostname: '172.31.7.75', // or 0.0.0.0 //nomedelservizio - ph or webapp_ph
  port: 8000,
  path: '/sunny',
  method: 'GET'
}




app.get('/allvalues', async (req, res) => {
  let temperature = await get_temp_from_micros()
  let rain = await get_rain_from_micros()
  let sunny = await get_sunny_from_micros()
  
  let timestamp = getTimestamp();
  
  let result = {temperature: temperature , rain: rain, sunny: sunny, timestamp: timestamp};

  res.contentType('application/json');
  res.json(result);

})

app.listen(port, host);

console.log(`\n[*] - Back-end listening on port ${host}:${port}!`);




// ARROW FUNCTIONS

let getTimestamp = () => {
  let date_ob = new Date();
  let date = ("0" + date_ob.getDate()).slice(-2);
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  let year = date_ob.getFullYear();
  let hours = date_ob.getHours();
  let minutes = date_ob.getMinutes();
  let seconds = date_ob.getSeconds();
  // prints date & time in YYYY-MM-DD HH:MM:SS format
  let output = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds; 
  return output;
};

// Microservice of temperature
let get_temp_from_micros = () => {
  return new Promise((resolve,reject) => {
    const req = http.request(options_temperature, res => { //da sostituire con https
      res.on('data', d => {
        // process.stdout.write(d);
        let output = d.toString().split(":")[1].replace('"', '').replace('"}','');
        resolve(output)
      })
    })
    req.on('error', error => {
      console.error(error)
      reject(error)
    })
    req.end()
  });
}

// Microservice of umidity
let get_rain_from_micros = () => {
  return new Promise((resolve,reject) => {
    const req = http.request(options_rain, res => { //da sostituire con https
      res.on('data', d => {
        // process.stdout.write(d);
        let output = d.toString().split(":")[1].replace('"', '').replace('"}','');
        resolve(output)
      })
    })
    req.on('error', error => {
      console.error(error)
      reject(error)
    })
    req.end()
  });
}

// Microservice of ph
let get_sunny_from_micros = () => {
  return new Promise((resolve,reject) => {
    const req = http.request(options_sunny, res => { //da sostituire con https
      res.on('data', d => {
        // process.stdout.write(d);
        let output = d.toString().split(":")[1].replace('"', '').replace('"}','');
        resolve(output)
      })
    })
    req.on('error', error => {
      console.error(error)
      reject(error)
    })
    req.end()
  });
}