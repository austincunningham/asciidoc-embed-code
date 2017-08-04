"use strict";
exports.__esModule = true;
// tag::allfile[]
var logger_1 = require("@raincatcher/logger");
var sync = require("fh-sync-js");
var DataManager_1 = require("../src/DataManager");
// Provide backwards compatibility with documentation and examples
var $fh = { sync: sync };
var datasetId = 'UserTasks';
var options = {
    cloudUrl: 'http://localhost:3000',
    sync_frequency: 10,
    storage_strategy: 'dom'
};
$fh.sync.init(options);
var queryParams = {};
var metaData = {};
var task = {
    name: 'test task',
    status: 'finished'
};
$fh.sync.manage(datasetId, options, queryParams, metaData, function () {
    var manager = new DataManager_1.DataManager(datasetId);
    manager.create(task, function (err, data) {
        logger_1.logger.info('Data Saved', data, { tag: 'client:datasync-client:example' });
        manager.list(function (error, result) {
            logger_1.logger.error('List of elements', result, error, { tag: 'client:datasync-client:example' });
        });
        manager.update(data, function (error, result) {
            logger_1.logger.info('Data updated', result, error, { tag: 'client:datasync-client:example' });
        });
        manager.read(data.uid, function (error, result) {
            logger_1.logger.info('Data read', result, error, { tag: 'client:datasync-client:example' });
        });
        manager["delete"](data, function (error, result) {
            logger_1.logger.info('Data deleted', result, error, { tag: 'client:datasync-client:example' });
        });
    });
});
// Using native sync for more advanced use cases.
$fh.sync.notify(datasetId, function (notification) {
    var code = notification.code;
    if ('sync_complete' === code) {
        $fh.sync.doList(datasetId, function (res) {
            logger_1.logger.info('Successful result from list:', res, { tag: 'client:datasync-client:example' });
        }, function (err) {
            logger_1.logger.error('Error result from list:', err, { tag: 'client:datasync-client:example' });
        });
    }
});
// end::allfile[]
