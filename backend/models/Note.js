'use strict';
//TODO prototyping

var Note = function (id,title, text, prioroty, done) {
        this.id = id;
        this.createdAt = new Date();
        this.title = title;
        this.text = text;
        this.priority = prioroty;
        this.done = done;
};

module.exports = Note;