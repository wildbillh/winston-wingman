

/**
 * <h3>Description</h3>
 * Adds convenient functions for many of the common tasks for configuring [winston]{@link https://github.com/winstonjs/winston}.
 * Also adds support for reasonable defaults.<br/><br/>
 * <h3>Example</h3>
 * <pre><code>
  // Run this way the file transport filename is app.log and level is info (default);
  let winstonWingman = require ('winston-wingman');
  // You can access winston for each file by requiring winston or using the
  // export from winstonWingman
  let winston = winstonWingman.winston;
  winstonWingman.setConsoleLevel('silly');
  winston.silly('I am here');
 * </code></pre>
 * <h3>Defaults</h3>
 * The console and file transports utilize the following default values:
 * <pre><code>
 * let currentConsoleTransport = {
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
 * </code></pre>
 * @module winston-wingman
 * @requires winston
 */

"use strict";
var winston = require('winston');


// Set defaults for the console and file transport
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

winston.remove(winston.transports.Console);
winston.add(winston.transports.Console, currentConsoleTransport);
winston.add(winston.transports.File, currentFileTransport);

/**
 * Initializes the module. This function should be called early in the application process.
 * @param {string} [initialLogFilename='app.log']  - Initial log file name to use.
 * @param {boolean} [loadConsole=true]  - If true, load the default console.
 */
exports.init = function (initialLogFilename = `app.log`, loadConsole = true) {

    winston.remove(winston.transports.Console);
    if (loadConsole) {
        winston.add(winston.transports.Console, currentConsoleTransport);
    }

    currentFileTransport.filename = initialLogFilename;
    winston.remove(winston.transports.File);
    winston.add(winston.transports.File, currentFileTransport);
};


/**
 * Modify the existing Console Transport.
 * The given config will be merged with the current one.<br/>
 * Example: To turn the colorize property of the console off:<br/>
 * <code>winstonWingman.mergeConsoleTransport({colorize: false});</code>
 * @param config {object} One or more Winston config key pairs.
 */
exports.mergeConsoleTransport = function(config) {
    currentConsoleTransport = Object.assign(currentConsoleTransport, config);
    winston.remove(winston.transports.Console);
    winston.add(winston.transports.Console, currentConsoleTransport);
};

/**
 * Set the value of the console transport. Use this function when you want
 * to completely replace the transport config.
 * @param {object} config A valid Winston transport config
 */
exports.setConsoleTransport = (config) => {
    currentConsoleTransport = config;
    winston.remove(winston.transports.Console);
    winston.add(winston.transports.Console, currentConsoleTransport);
};

/**
 * Set the level of the console. Possible values are:
 * 'silly', 'debug', 'verbose', 'info', 'warn' or 'error'
 * @param level {string} The new level to set.
 */
exports.setConsoleLevel = function (level) {
    if (!isValidLevels(level)) {
        return;
    }
    currentConsoleTransport.level = level;
    winston.remove(winston.transports.Console);
    winston.add(winston.transports.Console, currentConsoleTransport);
};


/**
* Set the value of the file transport. Use this function when you want to
 * completely replace the transport config.
* @param {object} config A valid Winston transport config.
*/
exports.setFileTransport = (config) => {
    currentConsoleTransport = config;
    winston.remove(winston.transports.File);
    winston.add(winston.transports.File, currentFileTransport);
};


/**
 * Modify the existing File Transport.
 * The given config will be merged with the current one.
 * @param config {Object} One or more Winston transport key pairs.
 */
exports.mergeFileTransport = function(config) {
    currentFileTransport = Object.assign(currentFileTransport, config);
    winston.remove(winston.transports.File);
    winston.add(winston.transports.File, currentFileTransport);
};


/**
 * Set the level of the file transport. Possible values are:
 * 'silly', 'debug', 'verbose', 'info', 'warn' or 'error'
 * @param level {string} The new level to set.
 */
exports.setFileLevel = function (level) {
    if (!isValidLevels(level)) {
        return;
    }
    currentConsoleTransport.level = level;
    winston.remove(winston.transports.File);
    winston.add(winston.transports.File, currentFileTransport);

};

/**
 * @private
 * @param level
 * @returns {boolean}
 */
var isValidLevels = function (level) {
    var possible = ['silly', 'debug', 'verbose', 'info', 'warn', 'error'];
    return (level && (possible.indexOf(level) !== -1));

};

// export winston so apps can use our logger
exports.winston = winston;