var request = require('request');

var cmdInput = process.argv[2];

request(cmdInput, (err, res, body) => {

  if (err) {
    throw err;
  }
  
  console.log(body);

});
