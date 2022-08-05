'use strict';

//1st (DOTENV) read our environment variable:
require('dotenv').config();


//2nd (instal express ,cors ) application Dependencies:
const express = require('express');
const cors = require('cors');

//3rd application setup:
//for server or app:
const app = express();
//for cors:
app.use(cors());

//To read the weather data from the `weather.json` file
const weatherData = require('./data/weather.json');


//To create the API
app.get('/weather', (req, res) => {
  //send data to the user
  //res.send(weatherData);

  const searchQuery = req.query.searchQuery;
  const lat = req.query.lat;
  const lon = req.query.lon;

  const cityArr = weatherData.find(item => item.city_name.toUpperCase() === searchQuery.toUpperCase())
  // console.log(cityArr);

  try {
    const cityData = cityArr.data.map(item => new Forecast(item));
    // console.log(cityData);
    // res.send(cityData);
    //200: standard response for successful HTTP requests
    res.status(200).send({cityData});

  } catch (error) {
    errorHandler(error, res);

  }
});

//any req I dont cover it , go here
app.get('*', (req, res) => {res.status(404).send('404 Page not found!!')});

function errorHandler(error, res) {
  res.status(500).send({error: '500 Something not correct!!'});
}


class Forecast {
  constructor(day) {
    this.day = day.valid_date;
    this.description = day.weather.description;
  }
}


app.listen(process.env.PORT, () => {
  console.log('The server is working ^_^ yahoooo');
});

