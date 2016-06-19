'use strict';

var Note = function (id, dueDate, title, text, priority, done) {
    this.id = id;
    this.dueDate = dueDate;
    this.title = title;
    this.text = text;
    this.priority = priority;
    this.done = done;
};

module.exports = Note;