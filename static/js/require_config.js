requirejs.config({

    urlArgs: "bust=" +  (new Date()).getTime(),

    baseUrl	: '/static/js/app',

    paths   : {
	    jquery          : '/static/js/lib/jquery/dist/jquery', 
	    underscore      : '/static/js/lib/underscore/underscore', 
	    backbone        : '/static/js/lib/backbone/backbone',
	    marionette      : '/static/js/lib/backbone.marionette/lib/backbone.marionette'
	}, 

	shim    : {
	    backbone: {
	        deps        : ['jquery', 'underscore'], 
	        exports     : 'Backbone'
	    }, 
	    marionette: {
	        deps        : ['backbone'], 
	        exports     : 'Marionette'
	    }
	    // car: {
	    // 	deps        : ['app'], 
	    //     exports     : 'Car'
	    // }
	}
});

// requirejs(['/static/js/app/main.js']);

requirejs(['main'], function(App){
	App.start();
});

// require(['initialize'], function(initializer){
//     alert("initialized");
// });