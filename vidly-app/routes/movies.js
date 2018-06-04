const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const { Movie, validate } = require('../models/movies');
const { Genre } = require('../models/genres');


// // show all movies
router.get('/', async (req, res) =>{
    const movies = await Movie
    .find()
    .sort('title');
    res.send(movies); 
});

// add a  Movie to the movies array
router.post('/', async (req, res) =>{
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findById(req.body.genreId);
    if(!genre) return res.status(404).send('Invalid genre');

    let movie = new Movie({ 
        title: req.body.title, 
        genre: {
            _id: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate 
    });
    movie = await movie.save();

    res.send(movie);

 });

// update Movie
router.put('/:id', async (req, res) =>{
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send('Invalid genre.');

    const movie = await Movie.findByIdAndUpdate(req.params.id,
        {
            title: req.body.title, 
            genre: {
                _id: genre._id,
                name: genre.name
            },
            numberInStock: req.body.numberInStock,
            dailyRentalRate: req.body.dailyRentalRate }, 
            { new: true}
    );
    if(!movie) return res.status(404).send('The Movie you are looking for isn\'t here ');

    res.send(movie);
});

router.delete('/:id', async (req, res) =>{
    const movie =  await Movie.findByIdAndRemove(req.params.id);

    if(!movie) return res.status(404).send('The Movie you are looking for isn\'t here ');
    
    res.send(movie);
});

router.get('/:id', async (req, res) =>{
    const movie = await Movie.findById(req.params.id);

    if(!movie) return res.status(404).send('The Movie you are looking for isn\'t here ');

    res.send(movie);
});

module.exports = router;