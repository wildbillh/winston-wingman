/**
 * Created by HODGESW on 10/25/2016.
 */

// Run this way the file transport filename is app.log and level is info (default);
let winstonWingman = require ('../lib/winston-wingman');
let winston = winstonWingman.winston;
winstonWingman.setConsoleLevel('silly');
winston.silly('I am here');

