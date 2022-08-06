'use strict';

//1st (DOTENV) read our environment variable:
require('dotenv').config();


//2nd (instal express, cors, axios ) application Dependencies:
const express = require('express');
const cors = require('cors');
const axios = require('axios');


//3rd application setup:
//for server or app:
const app = express();
//for cors:
app.use(cors());


//To read the weather data from the `weather.json` file
const weatherData = require('./data/weather.json');


//To create the API
app.get('/weather', async (req, res) => {
  //send data to the user
  //res.send(weatherData);

  const searchQuery = req.query.searchQuery;
  const lat = req.query.lat;
  const lon = req.query.lon;

  //  This for the json
  //   const cityArr = weatherData.find(item => item.city_name.toUpperCase() === searchQuery.toUpperCase())
  // console.log(cityArr);
  // ---------------------
  //  This for the axios
  const cityArr = await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}`);
  console.log(cityArr.data);

  try {
    const cityData = cityArr.data.data.map(item => new Forecast(item));
    // console.log(cityData);
    // res.send(cityData);
    //200: standard response for successful HTTP requests
    res.status(200).send({cityData});

  } catch (error) {
    errorHandler(error, res);
  }
});


app.get('/movies', async (req, res) => {
  const searchQuery = req.query.searchQuery;
  //https://api.themoviedb.org/3/search/movie?api_key=d9c8485a5784c3a1efadc76c9ef7777d&query=amman
  const movieArr = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${searchQuery}`);
  try {
    const movieData = movieArr.data.results.map(item => new Movie(item));
    res.status(200).send(movieData);
  } catch (error) {
    errorHandler(error, res);
  }
});


//any req I dont cover it , go here
app.get('*', (req, res) => {res.status(404).send('404 Page not found!!')});


function errorHandler(error, res) {
  res.status(500).send({error: '500 Something not correct!!'});
}


// Classes
class Forecast {
  constructor(day) {
    this.day = day.valid_date;
    this.description = day.weather.description;
  }
}

class Movie {
  constructor(movie) {
    this.title= movie.title,
    this.overview= movie.overview,
    this.average_votes= movie.vote_average,
    this.total_votes= movie.votes_count,
    this.image_url= movie.image_url,
    this.popularity= movie.popularity,
    this.released_on= movie.released_date;
  }
}


app.listen(process.env.PORT, () => {
  console.log('The server is working ^_^ yahoooo');
});

