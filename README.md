# PromiseTick

Handle progress events while keeping promise syntax.    
This code creates a new class `PromiseTick` which extends `Promise`.    

 - The executor is passed an extra argument `tick`, after the _reject_ parameter.    
 - Instances of `PromiseTick` have a method `tick` which define the function to be invoked when `tick` gets called
 - The `then` method has a third parameter, `tick` which can be used to define the tick function instead

If you 

### Usage

    new PromiseTick(
        (res, rej, tick) => {
            const i = setInterval(_ => tick('progress'), 200);
            setTimeout(_ => {
                // `tick` will stop after `res()` is invoked, but the interval
                // in this example would keep running without this line
                clearInterval(i);
                // resolve
                res('done');
            }, 5000);
        }
    ).tick(console.warn).then(console.log, console.error);
    // same as
    // .then(console.log, console.error, console.warn);

### Notes

 - Repeated calls of `promiseTick.tick` or a `promiseTick.tick` followed by a `promiseTick.then` with a tick function will replace any previous tick function
 - The return value of the `then` method is a `Promise`, not a `PromiseTick`

