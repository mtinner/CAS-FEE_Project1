'use strict';

var Note = function (id, createdAt, title, text, priority, done) {
    this.id = id;
    this.createdAt = createdAt;
    this.title = title;
    this.text = text;
    this.priority = priority;
    this.done = done;
};

module.exports = Note;