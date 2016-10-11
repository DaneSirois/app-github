require('dotenv').config();

const request = require('request');
const fs = require('fs');
const utilities = require('./utilities.js');

const cmdInput = process.argv.slice(2);
const userName = cmdInput[0] || "placeholder";
const repoName = cmdInput[1] || "placeholder";

const createReqHeader = (url) => {
  return {
    url: url,
    headers: {
      'User-Agent': 'request'
    },
    auth: {
      user: (process.env.USERNAME === undefined) ? console.log("ERROR: Add your Github username to the '.env' file!") : process.env.USERNAME,
      pass: (process.env.CLIENT_KEY === undefined) ? console.log("ERROR: Add your Github client key to the '.env' file!") : process.env.CLIENT_KEY
    }
  }
};

const getRepoContributors = (userName, repoName) => {

  const repoURL = `https://api.github.com/repos/${userName}/${repoName}/contributors`;

  request(createReqHeader(repoURL), (err, res, body) => {
    if (err) { 
      console.log("Missing a command line argument when running this file! Check your input and try again!");
      throw err 
    };

    const contributors = JSON.parse(body);
    
    contributors.forEach( (user) => { downloadAvatarFromUrl(user.avatar_url, user.login) });
  });

};

const downloadAvatarFromUrl = (url, userName) => {

  utilities.checkForDirectory('./avatars');
  
  request(createReqHeader(url)).pipe(fs.createWriteStream(`./avatars/${userName}.jpg`));

  console.log(`Successfully written ${userName}'s avatar to 'app-github/avatars'!`);

}

getRepoContributors(userName, repoName);
