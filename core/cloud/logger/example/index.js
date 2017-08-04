"use strict";
exports.__esModule = true;
// tag::allfile[]
// npm run example
var index_1 = require("../src/index");
// by default logger is turned off
index_1.logger.info('This should not render', { orthis: 'will not return' });
index_1.logger.error('This should not render', { orthis: 'will not return' });
index_1.logger.debug('This should not render', { orthis: 'will not return' });
index_1.logger.warn('This should not render', { orthis: 'will not return' });
// you can instantiate the default logger with any Logger implementation to change the global logger
var log = new index_1.BunyanLogger({ name: 'index', level: 'trace' });
index_1.setLogger(log);
index_1.logger.info('This log will render with BunyanLogger');
// constructor accept bunyan options. Please refer to https://www.npmjs.com/package/bunyan
index_1.logger.debug('debug logger message\n', { testObject: 'debug' }, { anything: 'anything' });
index_1.logger.info('info logger message\n', { testObject: 'info' });
index_1.logger.warn('warn logger message\n', { testObject: 'warn' });
index_1.logger.error('error logger message\n', { testObject: 'error' });
// change the logger to console
index_1.setLogger(new index_1.ConsoleLogger());
index_1.logger.warn('=========================================================================================');
index_1.logger.info('info wont render as console default logger level set at warn');
index_1.logger.warn('logger is now set to Console logger and level is warn');
index_1.logger.warn('=========================================================================================');
// change the logLevel for console log to info
index_1.setLogger(new index_1.ConsoleLogger(LogLevel.INFO));
index_1.logger.info('console logger info level will now render');
index_1.logger.info('=========================================================================================');
// end::allfile[]
