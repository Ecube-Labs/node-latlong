var execFile = require('child_process').execFile;
var path = require('path');

module.exports = function getTimezoneByCoords(latitude, longitude, callback) {
    return new Promise(function (resolve, reject) {
        execFile(path.join(__dirname + '/bin/latlong-cli'), [latitude, longitude], function (err, stdout, stderr) {
            if (err || stderr || !stdout) {
                var error = err || new Error(stderr || 'Failed to get timezone. The result is empty.');
                if (!stdout) {
                    error.emptyResult = true;
                }

                if (callback) {
                    resolve();
                    callback(error);
                } else {
                    reject(error);
                }
                return;
            }

            resolve(stdout);
            return callback && callback(null, stdout);
        });
    });
};



