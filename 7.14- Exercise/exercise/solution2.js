const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises')
    .then(() => console.log('Connected to Mongo-exercises DB'))
    .catch(err => console.error('Could not  connect to MongoDB', err));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: Date,
    isPublished: Boolean,
    price: Number
});

const Course = mongoose.model('Course', courseSchema);

async function getCourses() {
    return await Course
        .find({isPublished: true, tags: {$in: ['frontend', 'backend']}})
        .sort({price: -1})
        .select('name author price')
    
        
}
async function run () {
    const courses = await getCourses();
    console.log(courses)
}
run ();