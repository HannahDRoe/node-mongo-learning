
console.log('Before');

// Promise based approach
//  getUser(1)
//     .then(user => getRepositories(user.gitHubUserName))
//     .then(repos => getCommits(repos[0]))
//     .then(commits => console.log('commits', commits))
//     .catch(err => console.log('Error', err.message));

// Async and Await approach
async function displayCommits() {
    try {
        const user = await getUser(1);
        const repos =  await getRepositories(user.gitHubUserName);
        const commits = await getCommits(repos[0]);
    }
    catch(err){
       console.log('Error', err.message)
    }
    console.log(commits);
}

displayCommits();


console.log('After');

//Named function approach
//  getUser(1, getRepositories);
// function displayCommits(commits){
//     console.log('commits');
// }
// function getCommits(repos){
//     getCommits(repos[0], displayCommits);
// }
// function getRepositories(user) {
//     getRepositories(user.gitHubUserName, getCommits);
// }


function getUser(id) {
    return new Promise((resolve, reject) =>{
        setTimeout(() => {
            console.log('Reading a user database...');
            resolve( { id: id, gitHubUserName: 'bananas'});
        }, 2000);
    });
   
}

function getRepositories(username) {
    return new Promise((resolve, reject) =>{
        setTimeout(() => {
            console.log('Getting Repositories...');
            resolve(['repo1', 'repo2', 'repo3']);
            // reject(new Error('Could not get repos'))
        }, 2000);
    });
}

function getCommits(repo) {
    return new Promise((resolve, reject) =>{
        setTimeout(() => {
            console.log('Calling GitHub API');
            resolve(['commit']);
        }, 2000);
    });

}



