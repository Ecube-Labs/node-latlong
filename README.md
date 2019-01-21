# node-latlong
Get timezone ID (such as `America/Los_Angeles`) from coordinates (latitude, longitude).

`node-latlong` internally uses [latlong-cli](https://github.com/Ecube-Labs/latlong-cli) which is a executable of [bradfitz/latlong](https://github.com/bradfitz/latlong).

## blazingly fast
No external API call. You can even run its method synchronously. It takes just few milliseconds.

## lightweight
TL;DR: It's about `2.4MB` after install.

There are pre-built binary distributions of `latlong-cli` for some major platforms in the package but useless executables will be automatically deleted by `postinstall` npm script when you install `node-latlong`.

# usage
## as a Node.js module
```bash
$ npm install node-latlong
```
```js
const getTimezoneByCoords = require('node-latlong');

// use Promise, async / await
try {
    const timezone = await getTimezoneByCoords(37.7833, -122.4167);
    // 'America/Los_Angeles'
} catch (err) {
    // handle error
}

// use callback
getTimezoneByCoords(37.7833, -122.4167, (err, result) => {
    if (err) {
        // handle error
    }
    console.log(result);
    // 'America/Los_Angeles'
});

const getTimezoneByCoordsSync = require('node-latlong/sync');
const timezone = getTimezoneByCoordsSync(37.485419, 126.894239);
// 'Asia/Seoul'
```
## global cli-executable
```bash
$ npm install -g node-latlong
$ latlong-cli 37.485419 126.894239
> Asia/Seoul
```
Keep that in mind [the result can be empty string](#it-throws-error-when-the-result-is-empty) when you run binary directly.

# methods
## getTimezoneByCoords(latitude: number, longitude: number, [callback: function]): Promise
If `callback` is provided, `Promise` always will be resolved without rejection.
## getTimezoneByCoordsSync(latitude: number, longitude: number): string
It's synchronous version of `getTimezoneByCoords`. You can get this method by `require('node-latlong/sync')`.

# known issues / things to know
## It throws error when the result is empty
The result of `bradfitz/latlong` can be empty string if the input is junk. In this case, `node-latlong` throws an error. You can check it by `error.emptyResult` (`boolean`).
```js
getTimezoneByCoords(37.7833, -122.4167).catch(err => {
    if (err && err.emptyResult) {
        // throw error or pass it over with kindly tolerance
    }
})
```
## Why I get `Asia/Phnom_Penh` with this coordinates?
This is an [issue](https://github.com/bradfitz/latlong/issues/1) of `bradfitz/latlong`.

## I got an error on install
`node-latlong doesn't support this platform or processor architecture`

-> Please make issue or pull request to add the pre-built binary distribution for your platform/architecture.
