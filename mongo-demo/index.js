const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB', err))

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ],
    date: {type: Date, default: Date.now},
    isPublished: Boolean
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    const course = new Course({
        name: 'Angular course',
        author: 'Mosh',
        tags: ['angular', 'frontend'],
        isPublished: true
    });
    
    const result = await course.save();
    console.log(result)
}
// createCourse();
async function getCourses(){
    const pageNumber = 2;
    const pageSize = 10;

    const courses = await Course
        .find({author: 'Mosh', isPublished: true })
        .skip((pageNumber-1)* pageSize)
        .limit(pageSize)
        .sort({ name: 1})
        .select({ name: 1, tags: 1})
        // .count();
   console.log(courses);
}
// getCourses();

async function updatedCourse(id){
    // Approach: Query First 
    // findById()
    //Modify its properties
    // save()

    // const course = await Course.findById(id);
    // if(!course) return;
    // course.set({
    //     isPublished: true,
    //     author: 'Another  Author'
    // });
    // const result = await course.save();
    // console.log(result);


    //Approach2: Update First 
    // Update directly
    // Otionally: get the updated document 

    // const result = await Course.update({_id: id}, {
    //     $set: {
    //         author: 'Mosh',
    //         isPublished: false
    //     }
    // });

    // Otionally: get the updated document 
        const course = await Course.findByIdAndUpdate(id, {
        $set: {
            author: 'Jason',
            isPublished: false
        }
    }, { new: true });

    console.log(course);
}


// updatedCourse('5af35af46205fa1510891af3');

async function removeCourse(id){
    // const result = await Course.deleteOne({_id: id});
    const course = await Course.findByIdAndRemove(id);
    console.log(course);
}


removeCourse('5af3827d557ff60340e13231');