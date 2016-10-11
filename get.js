var request = require('request');
var http = require('http');

var cmdInput = process.argv[2];

let readHTML = function (url, callback) {

  const requestOptions = {
    host: url,
    path: "/"
  };

  http.get(requestOptions, (res) => {
    
    res.setEncoding("utf8");
    var foo = "";

    res.on("data", (data) => {
      //console.log(data);  
      foo += data;
    });

    res.on("end", () => {
      callback(foo);
    });


  });

};

readHTML(cmdInput, (htmlData) => {
  console.log(htmlData);
});
