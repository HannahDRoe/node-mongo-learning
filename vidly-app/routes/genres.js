const express = require('express');
const router = express.Router();

const genres = [
    {id: 1, name: 'Action'},
    {id: 2, name: 'Adventure'},
    {id: 3, name: 'Comedy'},
    {id: 4, name: 'Crime'},
    {id: 5, name: 'Drama'},
    {id: 6, name: 'Fantasy'},
    {id: 7, name: 'Historical'},
    {id: 8, name: 'Horror'},
    {id: 9, name: 'Mystery'},
    {id: 10, name: 'Philosophical'},
];

// show all genres
router.get('/', (req, res) =>{
    res.send(genres); 
});

// get and display certain genre based on params
router.get('/:id', (req, res) =>{
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send('The Genre you are looking for isn\'t here ');

    res.send(genre);
});


// add a  genre to the genres array
router.post('/', (req, res) =>{
    const { error } = validateGenre(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const genre ={
        id: genres.length + 1,
        name: req.body.name
    };
    genres.push(genre);
    res.send(genre);

 });

// update genre
router.put('/:id', (req, res) =>{
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send('The Genre you are looking for isn\'t here ');

    const { error } = validateGenre(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    genre.name = req.body.name;
    res.send(genre);
});

router.delete('/:id', (req, res) =>{
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send('The Genre you are looking for isn\'t here ');
    
    const index = genres.indexOf(genre);
    genres.splice(index, 1);
    res.send(genre);
});

 function validateGenre(genre){
    const schema ={
        name: Joi.string().min(3).required()
    }
    return Joi.validate(genre, schema);
}

module.exports = router;