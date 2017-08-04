"use strict";
exports.__esModule = true;
// tag::allfile[]
var logger_1 = require("@raincatcher/logger");
var index_1 = require("../src/index");
var sync = index_1["default"];
// Connect sync
var connectOptions = {
    datasetConfiguration: {
        mongoDbConnectionUrl: process.env.MONGO_CONNECTION_URL || 'mongodb://127.0.0.1:27017/sync',
        mongoDbOptions: {},
        redisConnectionUrl: process.env.REDIS_CONNECTION_URL || 'redis://127.0.0.1:6379'
    },
    globalSyncOptions: { useCache: false }
};
sync.connect(connectOptions, function (err) {
    if (err) {
        logger_1.logger.error(err, { tag: 'cloud:datasync:example' });
    }
});
// Create express middleware
var bodyParser = require("body-parser");
var cors = require("cors");
var express = require("express");
var app = express();
// middleware
app.use(bodyParser.json());
app.use(cors());
var middleware = new index_1.SyncExpressMiddleware('/sync/:datasetId');
var router = middleware.createSyncExpressRouter();
app.use('/', router);
app.listen(3000, function () {
    logger_1.logger.info('Example app listening on port 3000!', { tag: 'cloud:datasync:example' });
});
// If you wish to see logs;
process.env.DEBUG = 'fh-mbaas-api:sync';
// end::allfile[]
