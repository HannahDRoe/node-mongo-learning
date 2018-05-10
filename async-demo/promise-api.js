// const p1 = Promise.resolve({id: 1});
// p1.then(result => console.log(result));

// const p2 = Promise.reject(new Error( 'resaon for rejection'));
// p2.catch(err => console.log(err));

const p1 = new Promise((resolve) =>{
    setTimeout(() => {
        console.log('Async operation 1....');
        resolve(1);
    }, 2000);

});

const p2 = new Promise((resolve) =>{
    setTimeout(() => {
        console.log('Async operation 2....');
        resolve(3);
    }, 2000);

});

Promise.all([p1, p2])
    .then(result => console.log(result))
    .catch(err =>console.log('Error', err.message));

// Promise.race