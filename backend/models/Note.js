'use strict';

var Note = function (id, title, text, priority, done) {
    this.id = id;
    this.createdAt = (function () {
        var date = new Date();
        date.setDate(date.getDate() + id);
        return date;
    })();
    this.title = title;
    this.text = text;
    this.priority = priority;
    this.done = done;
};

Note.prototype.setTitle = function (title) {
    this.title = title;
};

Note.prototype.setText = function (text) {
    this.text = text;
};

Note.prototype.setPriority = function (priority) {
    this.priority = priority;
};

Note.prototype.setDone = function (done) {
    this.done = done;
};

module.exports = Note;