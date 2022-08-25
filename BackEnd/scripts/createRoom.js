const fs = require('fs');
const http = require('http');
const file = fs.createWriteStream('file.docx')

module.exports = function (path) {
  path += `.html`;
  fs.appendFile(path, 'plc', function (err) {
    if (err) throw err;
  });
}
