import $ from 'jquery';
import Handlebars from 'handlebars';
import {home} from './home';
import {details} from './details';


//after Page is loaded
$(function () {

    registerHandlebarsHelper();
    var homeContainer = $('#home-container');
    var detailsContainer = $('#details-container');

    detailsContainer.hide();

    homeContainer.load('/dist/app/views/home.hbs', function () {
        home.init();
    });
    detailsContainer.load('/dist/app/views/details.hbs', function () {
        details.init();
    });
});

function registerHandlebarsHelper() {
    Handlebars.registerHelper('ifCond', function (v1, v2, options) {
        if (v1.toString() === v2.toString()) {
            return options.fn(this);
        }
        return options.inverse(this);
    });

    Handlebars.registerHelper('toLocaleDateString', function (createdAt) {
        return new Date(createdAt).toLocaleDateString();
    });

    Handlebars.registerHelper('toShortISOString', function (createdAt) {
        var isoString = new Date(createdAt).toISOString();
        return isoString.slice(0, isoString.indexOf('T'));
    });
}

