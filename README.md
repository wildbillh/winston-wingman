# winston-wingman
[![npm version](https://badge.fury.io/js/winston-wingman.svg)](https://badge.fury.io/js/winston-wingman)
## Synopsis
The winston-wingman module supplies common defaults to the winston logger.
It also offers an easy interface for modifying transports on the fly
and encapsulates the underlying loading.
Once the module has loaded, you can use either the exposed winston object, 
or just require winston in the normal way in your source files.
Usually the top level file in a project will require winston-wingman and make any configuration 
changes. All other modules will just require the winston module. 
See the documentation of the winston module for additional features; https://github.com/winstonjs/winston.

## Install
```
$ npm install winston-wingman --save
```


## Usage
```javascript
// In the main startup file configure the logger
let logger = require('winston-wingman');
let winston = logger.winston;

// All of your other js files that log, can use either below
// let winston = require('winston');
// let winston = require('winston-wingman').winston;

// change the name of the logfile to be used.
logger.mergeFileTransport({filename: 'logs/myspecialname.log'});

winston.info('logging is easy');

```

##Default Configuration

If no additional configurations are used, here are the defaults: 

```javascript
let currentConsoleTransport = {
    timestamp: (function() {return new Date().toLocaleString();}) ,
    colorize: true,
    level: 'info',
    handleExceptions: true,
    humanReadableUnhandledException: true
};

 let currentFileTransport = {
    filename: 'app.log',
    timestamp: (function() {return new Date().toLocaleString();}) ,
    level: 'info',
    handleExceptions: true,
    humanReadableUnhandledException: true,
    maxsize: 10000,
    maxFiles: 5,
    tailable: true,
    json: false,
    zippedArchive: true
};
```

## Documentation
The class is documented with JSDoc. 

## Author
Bill Hodges 
