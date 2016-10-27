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
var wingman = require('winston-wingman');
var winston = logger.winston;

// change the name of the logfile to be used.
logger.mergeFileTransport({filename: 'logs/myspecialname.log'});

```

## Documentation
The class is documented with JSDoc. 

## Author
Bill Hodges 
