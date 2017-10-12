var fs = require('fs');

let SaveToDisk = function (json, fileName, callback) {
    fs.writeFile(fileName, json, 'utf8', callback);
}

function FileExists(path) {
    return fs.existsSync(path);
}

module.exports.SaveToDisk = SaveToDisk;
module.exports.FileExists = FileExists;