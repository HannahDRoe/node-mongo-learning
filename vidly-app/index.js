const mongoose = require('mongoose');

const express = require('express');
const app = express();
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const home = require('./routes/home');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');

mongoose.connect('mongodb://localhost/vidly-app')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB', err))


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/', home);
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);


//setting up port
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
