
require('dotenv').config();

var request = require('request');
let fs = require('fs');

const cmdInput = process.argv.slice(2);

const repoURL = `https://api.github.com/repos/${cmdInput[0]}/${cmdInput[1]}/contributors`;

const createReqHeader = (url) => {
  return ({
    url: url,
    headers: {
      'User-Agent': 'request'
    },
    auth: {
      user: process.env.USERNAME,
      pass: process.env.CLIENT_KEY
    }
  })
};

request(createReqHeader(repoURL), (err, res, body) => {
  if (err) { throw err };

  const contributors = JSON.parse(body);
  
  contributors.forEach((user) => { downloadAvatarFromUrl(user.avatar_url, user.id) });

});


const downloadAvatarFromUrl = (url, userId) => {
  
  request(createReqHeader(url)).pipe(fs.createWriteStream(`./avatars/user${userId}.jpg`));
}


