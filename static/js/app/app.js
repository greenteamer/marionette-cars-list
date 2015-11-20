define(['jquery' ,'backbone', 'marionette'],
    function ($, Backbone, Marionette) {

        // Create our Application
        var App = new Marionette.Application();

        App.addRegions({
            mainRegion: '#main-region'
        });

        return App;

    }
);
