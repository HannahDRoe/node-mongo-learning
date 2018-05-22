const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB', err))

const courseSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true,
        minlength: 5,
        maxlength: 255,
        // match: /pattern/
    },
    category :{
        type: String,
        required: true,
        enum: ['web', 'mobile', 'network'],
        lowercase: true,
        // uppercase: true,
        trim: true
    },
    author: String,
    tags:{
        type: Array,
        validate:{
            isAsync: true,
            validator: function (value, callback) {
                setTimeout(() => {
                    // Do async work
                    const result = value && value.length > 0; 
                    callback(result)
                }, 4000);
            },
            message: 'A course should have at least one tag'
        }
    },
    date: {type: Date, default: Date.now},
    isPublished: Boolean,
    price: {
        type: Number,
        required: function(){  return this.isPublished},
        min: 10,
        max: 200,
        get: v => Math.round(v),
        set: v => Math.round(v)
    }
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    const course = new Course({
        name: 'Angular course',
        category: 'WEB',
        author: 'Mosh',
        tags: ['frontend'],
        isPublished: true,
        price: 15.8888
    });
    
    try{
        const result = await course.save();
        console.log(result)
    }catch (ex){
        for (field in ex.errors) {
            console.log(ex.errors[field].message);
        }

    }

}
// createCourse();
async function getCourses(){
    const pageNumber = 2;
    const pageSize = 10;

    const courses = await Course
        .find({_id: '5afcb0a129b63504d8231be8'})
        // .skip((pageNumber-1)* pageSize)
        // .limit(pageSize)
        .sort({ name: 1})
        .select({ name: 1, tags: 1, price: 1})
        // .count();
   console.log(courses[0].price);
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


// removeCourse('5af3827d557ff60340e13231');
// createCourse();
getCourses();