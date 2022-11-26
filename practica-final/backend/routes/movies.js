const express = require('express');
const router = express.Router();
const Movie = require('../models/movies');
const User = require('../models/users');



//Devolver todos
router.get('/', async function (req, res) {
  try{
    const movies = await Movie.find();
    res.status(200);
    res.json(movies);
  }catch{
    res.status(400);
    res.send("Movies: Some error in get");
  }

})

//Subir nuevo
router.post('/', async function (req, res) {
  console.log(req);
  var existe= await Movie.findOne({title:req.body.title})
  if (existe === null){
    var aux= new Movie({
      title:req.body.title,
      sinopsis:req.body.sinopsis,
      imageLink:req.body.imageLink,
      
      info:{
        releaseDate:req.body.releaseDate,
        characters:req.body.characters,
        genre:req.body.genre,
        prizes:req.body.prizes,
        trailer:req.body.trailer,
        producer:req.body.producer,
        director:req.body.director,
      },

      duration:req.body.duration
    })

    await aux.save()
    return res.status(200).send("Película guardada correctamente.")

  }else{
    return res.status(400).send("Película ya existente.")
  }
})

router.put('/', async function(req, res) {
  try{
    const {movie_ID, user_ID, rate} = req.body;
    const movie = Movie.findOne({_id: movie_ID,rates:{user: user_ID}});
    if(movie == null){
      movie = Movie.findOne({_id: movie_ID});
      var numerador = movie.rateTotal*movie.rates.length;
      var denominador = movie.rates.length;
      numerador = numerador + rate;
      denominador = denominador +1;
      movie.rateTotal = numerador/denominador;
      movie.rates.push({rate: rate, user: user_ID});
      await movie.save();
      res.status(200).send('Valorada.');
    }else{
      res.status(200).send('Ya has valorado anteriormente.')
    }
  }
  catch{
    res.status(400);
    res.send('movies: error in put')
  }
})

router.get('/genre/:movie_genre', async function (req, res) {
  try{
    const movGen = req.params.movie_genre;
    const mov = await Movie.find({ 'info.genre': { "$regex": movGen, "$options": "i" }}).sort({'title': 1}).select('title imageLink');
    res.status(200);
    res.json(mov);
  }
  catch{
    res.status(400).end();
  }
})

//Get un movie por titulo
router.get('/title/:movie_title', async function (req, res) {
  try{
    const movTitle = req.params.movie_title;
    const mov = await Movie.find({ title: { "$regex": movTitle, "$options": "i" }}).sort({'title': 1}).select('title imageLink');
    res.status(200);
    res.json(mov);
    res.end();
  }
  catch{
    res.status(400);
    res.send('movies: title incorrect or movie does not exist.');
  }

})

//Get un movie por id
router.get('/id/:id', async function (req, res) {
	try{
		const mov = await Movie.findOne({_id: req.params.id});
		res.status(200);
		res.json(mov);
	}catch {
		res.status(400);
		res.end();
	}
})

//Get recientes
router.get('/newest', async function (req, res) {
	try{
		const mov = await Movie.find().sort({'info.releaseDate':-1}).limit(6).select('title imageLink');
		res.status(200).json(mov);
	}catch {
		res.status(400).end();
	}
})

router.post('/rate/:user', async function(req, res) {
	try {
    var user = await User.findOne({user: req.params.user});

    const mov = await Movie.findOne({_id: req.body.movieId});

    var changed = false;
    mov.rates.map((rate) => {
        if(rate.user.equals(user._id)) {
          mov.rateTotal = (mov.rateTotal * mov.rates.length - rate.rate + req.body.rate)/mov.rates.length; 
          rate.rate = req.body.rate;
          changed = true;
        }
    })

    if(!changed) {
      mov.rateTotal = (mov.rateTotal * mov.rates.length + req.body.rate)/(mov.rates.length+1); 
      mov.rates.push({
            user: user._id,
            rate: req.body.rate,
        })
    }
    await mov.save();

    res.json({rateTotal:mov.rateTotal});
		res.status(200).end();
	}catch {
		res.status(400).end();
	}
})

router.get('/rate/:user/:movieId', async function(req, res) {
	try {
    var user = await User.findOne({user: req.params.user});
    var mov = await Movie.findOne({_id: req.params.movieId});

    var valor = mov.rates.filter((rate) => rate.user.equals(user._id))
    res.send(valor);
		res.status(200).end();
	}catch {
		res.status(400).end();
	}
})

router.delete('/rate/:user', async function(req, res) {
	try {
    var user = await User.findOne({user: req.params.user});
    const mov = await Movie.findOne({_id: req.body.movieId});

    console.log(mov.rates[0].user);
    console.log(user.id);
    mov.rates = mov.rates.filter((rate) => rate.user.equals(user._id)===false)

    var total = 0;
    if(mov.rates.length > 0){
      for ( let i = 0; i < mov.rates.length; i++){
        total += mov.rates[i].rate;
      }
      total = total/mov.rates.length;
    }
    mov.rateTotal = total;

    await mov.save();
    res.json({rateTotal:total});
		res.status(200).end();
	}catch {
		res.status(400).end();
	}
})


//Delete un movie por ID concreto
router.delete('/:movie_id', async function (req, res) {
      try{
        const movieID = req.params.movie_id;
        await Movie.findOneAndDelete({_id: movieID});
        res.status(200);
        res.send('Movie deleted.');
        res.end();
      }
      catch{
        res.status(400);
        res.send('movies: movie_id incorrect or movie does not exist.');
        res.end();
      }

  })

  router.post('/imdb', async function (req, res) {
    const mov = await Movie.find({ title: req.body.title });
    const movie = new Movie({
      title: req.body.title,
      sinopsis: req.body.plotLocal,
      imageLink: req.body.image,
      rates: [],
      info: {
          releaseDate: req.body.releaseDate,
          characters: req.body.stars,
          genre: req.body.genres,
          prizes: req.body.awards,
          trailer: req.body.trailer.link,
          producer: req.body.companies,
          director: req.body.directors,
      },
      duration: req.body.runtimeMins,
    });
    if(mov != null) {
      await Movie.deleteOne({ title: req.body.title});
    }

    movie.save();
    res.status(200).end();
})

module.exports = router;