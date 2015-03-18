# Async Wait

This is a small JavaScript utility that waits for many async operations to finish. This is very similar to something like `async.map` or `Promise.all`, but with a looser API.

## Install

Download the latest version from our [release page](https://github.com/BeneathTheInk/asyncwait/releases) and use via a script tag.

```html
<script type="text/javascript" src="asyncwait.js"></script>
```

```js
asyncWait(function(){});
```

If using Browserify or Node.js, install with NPM.

```shell
$ npm install asyncwait
```

```js
var asyncWait = require("asyncwait");
```

## Usage

Call `asyncWait()` with an onEmpty callback. The callback will be called when all async operations being waited on have settled and completed. The returned method can be used to generate wait functions, which prevent the onEmpty callback from being called.

Here is a really basic example.

```javascript
var generateWait = asyncWait(function() {
    console.log("done");
});

var waitFn = generateWait();
setTimeout(waitFn, 100);
setTimeout(waitFn, 500); // calling twice does nothing
```

It's mostly useful for waiting for many async operations to finish. The onEmpty callback is run immediately after the last wait function is executed.

```javascript
var generateWait = asyncWait(function() {
    console.log("done");
});

myFirstAsyncThing(generateWait());
mySecondAsyncThing(generateWait());
myThirdAsyncThing(generateWait());
```

You can also pass a callback through the wait function. The callback is run prior to the onEmpty callback. This means you can generate and nest more wait functions within it.

```javascript
var generateWait = asyncWait(function() {
    console.log("done");
});

// callback is run as if generateWait wasn't even there
somethingAsync(generateWait(function(err) {
    if (err) dealWithError(err);
    
    // onEmpty waits for this one too
    myOtherAsyncThing(generateWait());
}));
```

This style of async control flow is really flexible and plays nice with everything. Here's an example with ES6 Promises:

```javascript
var generateWait = asyncWait(function() {
    console.log("done");
});

// we must add both a resolve and reject callback
// so our onEmpty function is guaranteed to run
// regardless of the outcome.
var done = generateWait();
myAsyncTask().then(function() {
    console.log("success");
    done();
}, function(err) {
    console.error(err);
    done();
});
```
