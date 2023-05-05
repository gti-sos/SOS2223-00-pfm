import axios from "axios";

const options = {
  method: 'GET',
  url: 'https://the-cocktail-db.p.rapidapi.com/search.php',
  params: {i: 'vodka'},
  headers: {
    'X-RapidAPI-Key': 'PUBXizWQP0vwoZwbhm%VDP-dYnPa-9WH',
    'X-RapidAPI-Host': 'the-cocktail-db.p.rapidapi.com'
  }
};

axios.request(options).then(function (response) {
	console.log(response.data);
}).catch(function (error) {
	console.error(error);
});