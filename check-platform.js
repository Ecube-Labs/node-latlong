var fs = require('fs');
var path = require('path');
var platform = process.platform;
var arch = process.arch;
var binMap = {
    'darwin-x64': 'darwin-amd64',
    'linux-x64': 'linux-amd64',
    'win32-x64': 'windows-amd64',
}

var myEnvKey = platform + '-' + arch;
if (myEnvKey in binMap) {
    var myEnv = binMap[myEnvKey];
    var dest = path.join(__dirname, '/bin/latlong-cli');
    fs.copyFileSync(getBinPath(myEnv), dest);
    for (var key in binMap) {
        var env = binMap[key];
        fs.unlinkSync(getBinPath(env));
    }
} else {
    console.error("node-latlong doesn't support this platform or processor architecture (" + platform + ', ' + arch + ')');
    process.exit(1);
}

function getBinPath(env) {
    return path.join(__dirname, '/latlong-cli/dist/', env, 'latlong-cli');
}
