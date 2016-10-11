const fs = require('fs');

module.exports = {
  checkForDirectory: (directory) => {
    try {
      fs.statSync(directory);
    } catch(e) {
      fs.mkdirSync(directory);
    }
  }
}