var getTz = require('./index');
var getTzSync = require('./sync');

// TODO: add more test cases
// TODO: iterate testcases
var testcases = [
    {
        lat: 37.485419,
        long: 126.894239,
        expected: 'Asia/Seoul',
    },
    {
        lat: 37.7833,
        long: -122.4167,
        expected: 'America/Los_Angeles',
    },
]

// test getTimezoneByCoords
var set1 = testcases[0];
getTz(set1.lat, set1.long).then(function (result) {
    if (result !== set1.expected) {
        fail(result, set1.expected);
    }
}, function (err) {
    console.error(err);
    process.exit(1);
});

// test getTimezoneByCoordsSync
var set2 = testcases[1];
var result = getTzSync(set2.lat, set2.long);
if (result !== set2.expected) {
    fail(result, set2.expected);
}

// test error handling
getTz('wrong', 'argument').then(function (result) {
    if (result) {
        fail('error', result)
    }
}, function (err) {
    // do nothing. expected error
});


function fail(result, expected) {
    console.error('Something went wrong. Expected ' + expected + ' but got ' + result);
    process.exit(1);
}
