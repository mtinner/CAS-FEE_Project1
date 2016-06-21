import $ from 'jquery';
import Handlebars from 'handlebars';
import {home} from './home';
import {details} from './details';

export const main = (function () {

    return {
        openHome: openHome,
        updateHomeView: updateHomeView,
        openDetails: openDetails,
        renderDetailsView: renderDetailsView
    };
    function openHome() {
        $('#details-container').hide();
        $('#home-container').show();
    }

    function updateHomeView() {
        home.updateView();
    }

    function openDetails() {
        $('#home-container').hide();
        $('#details-container').show();
    }

    function renderDetailsView(data) {
        details.renderView(data)
    }
})();


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

    Handlebars.registerHelper('toLocaleDateString', function (dueDate) {
        return new Date(dueDate).toLocaleDateString();
    });

    Handlebars.registerHelper('toShortISOString', function (dueDate) {
        var isoString = new Date(dueDate).toISOString();
        return isoString.slice(0, isoString.indexOf('T'));
    });
}
