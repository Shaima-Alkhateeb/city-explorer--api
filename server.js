'use strict';

//1st (DOTENV) read our environment variable:
require('dotenv').config();


//2nd (instal express, cors, axios ) application Dependencies:
const express = require('express');
const cors = require('cors');
const axios = require('axios');

//require the module
const {handleWeather} = require('./module/weather');
const {handleMovie} = require('./module/movies');

//3rd application setup:
//for server or app:
const app = express();
//for cors:
app.use(cors());



//app.get('endpoint', send the fun to other module )
//calling the endpoint to have the module in the main page
//the req, res will pass by default
//for weather
app.get('/weather', handleWeather);
//for movies
app.get('/movies', handleMovie);



//any req I dont cover it , go here
app.get('*', (req, res) => {res.status(404).send('404 Page not found!!')});


function errorHandler(error, res) {
  res.status(500).send({error: '500 Something not correct!!'});
}


app.listen(process.env.PORT, () => {
  console.log('The server is working ^_^ yahoooo');
});

