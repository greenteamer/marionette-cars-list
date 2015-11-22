define(['cookies', 'backbone', 'marionette'],
    function (Cookies, Backbone, Marionette) {

    	var oldSync = Backbone.sync;
    	var CSRF_TOKEN = Cookies.get('csrftoken');
		Backbone.sync = function(method, model, options){
		    options.beforeSend = function(xhr){
		        xhr.setRequestHeader('X-CSRFToken', CSRF_TOKEN);
		    };
		    return oldSync(method, model, options);
		};

        // Create our Application
        var App = new Marionette.Application();

        App.addRegions({
            mainRegion: '#main-region'
        });

        return App;

    }
);
