const { Router } = require('express');
const router = Router();
const _ = require('underscore');
const mongo = require('mongoose');
const movies = require('../sample.json');

mongo.connect('mongodb://localhost:27017/test', { useNewUrlParser: true });
const movieModel = mongo.model('Movie', { title: String, director: String, year: String, rating: String, id:String})

router.get("/", (req, res) => {
    const movieArray = [];
    const movieList = movieModel.find({"title": "David Marcano"});
    /*
    _.each(movieList, (movie, index) => {
        movieArray.push(movie);
    }); */
    console.log(movieList);
    res.send(movieList);
});

router.post("/", (req, res) => {
    const { title, director, year, rating } = req.body;
    if(title && director && year && rating) {
        const id = movies.length + 1;
        const newMovie = new movieModel({ ...req.body, id});
        console.log(newMovie);
        newMovie.save().then(() => console.log("Guardado!"));
        res.json(newMovie);
    } else {
        res.send("Datos incorrectos");
    }
    res.send("Recibido");
});

router.delete("/:id", (req, res) => {
    const { id } = req.params;
    _.each(movies, (movie, index) => {
        if(movie.id == id) {
            movies.splice(index, 1);
        }
    });
    res.send(movies);
    //const { } = req.params;
});

router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { title, director, year, rating } = req.body;

    if(title && director && year && rating) {
        _.each(movies, (movie, index) => {
            if(movie.id == id) {
                movie.title = title;
                movie.director = director;
                movie.year = year;
                movie.rating = rating;
            }
        });
        res.json(movies);
    } else {
        res.status(500).json({error: "Hubo un error"});
    }
});

module.exports = router;