// sync version of index.js#getTimezoneByCoords

var execFileSync = require('child_process').execFileSync;
var path = require('path');

module.exports = function getTimezoneByCoordsSync(latitude, longitude) {
    var stdout = execFileSync(path.join(__dirname + '/bin/latlong-cli'), [latitude, longitude]).toString();

    if (!stdout) {
        throw new Error('Failed to get timezone. The result is empty.');
    }

    return stdout;
};
