var fs = require('fs');
var platform = process.platform;
var arch = process.arch;
var binMap = {
    'darwin-x64': 'darwin-amd64',
    'linux-x64': 'linux-amd64',
    'win32-x64': 'windows-amd64',
}

var myEnv = platform + '-' + arch;
if (myEnv in binMap) {
    fs.copyFileSync(getBinPath(myEnv), './bin/latlong-cli');
    for (var key in binMap) {
        var env = binMap[key];
        fs.unlinkSync(getBinPath(env));
    }
} else {
    console.error("node-latlong doesn't support this platform or processor architecture (" + platform + ', ' + arch + ')');
    process.exit(1);
}

function getBinPath(env) {
    return './latlong-cli/dist/' + env + 'latlong-cli';
}
