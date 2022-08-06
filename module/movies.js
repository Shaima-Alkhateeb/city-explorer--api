const axios = require('axios');

//app.get('/movies', async (req, res) => {

async function handleMovie (req, res) {
  const searchQuery = req.query.searchQuery;
  //https://api.themoviedb.org/3/search/movie?api_key=d9c8485a5784c3a1efadc76c9ef7777d&query=amman
  const movieArr = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${searchQuery}`);
  try {
    const movieData = movieArr.data.results.map(item => new Movie(item));
    res.status(200).send(movieData);
  } catch (error) {
    errorHandler(error, res);
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


module.exports = {handleMovie}