const axios = require('axios');

//To create the API
//when doing the modularize
//chenge it from : app.get('/weather', async (req, res) => {
//to: async function handleWeather (req, res) { 
async function handleWeather (req, res) {
  //send data to the user
  //res.send(weatherData);

  const searchQuery = req.query.searchQuery;
  const lat = req.query.lat;
  const lon = req.query.lon;

  // This for the json
  // const cityArr = weatherData.find(item => item.city_name.toUpperCase() === searchQuery.toUpperCase())
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
}

//To read the weather data from the `weather.json` file
// const weatherData = require('./data/weather.json');


class Forecast {
  constructor(day) {
    this.day = day.valid_date;
    this.description = day.weather.description;
  }
}

module.exports = {handleWeather}