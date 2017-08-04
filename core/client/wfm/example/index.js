"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
// tag::allfile[]
var Promise = require("bluebird");
var src_1 = require("../src");
// Derive from BaseTask to implement one that deals with custom business logic
var MyTask = (function (_super) {
    __extends(MyTask, _super);
    function MyTask() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MyTask.prototype.run = function () {
        this.updateStatus(src_1.TaskStatus.ASSIGNED);
        // Here the implementation would wait for user input or execute automatically
        // moving the status as progress occurs
        // BaseTask's implementation takes care of publishing the 'statusChanged' event
        // when a Task reaches the DONE status, the default Executor implementation will move to the next task.
        this.updateStatus(src_1.TaskStatus.DONE);
    };
    return MyTask;
}(src_1.BaseTask));
// Each Process contains a set of Tasks to be executed.
var exampleProcess = new src_1.ProcessImpl('Example', [
    new MyTask()
]);
// Provide an implementation of the Repository required by the Process in order to have persistent storage
var repository = {
    saveInstance: function (instance) {
        // Save data to persistent storage here
        return Promise.resolve(instance);
    }
};
// Finally the executor creates a ProcessInstance from the supplied Process, allowing it to be executed
var executor = new src_1.ExecutorImpl(exampleProcess, repository);
executor.start();
// end::allfile[]
