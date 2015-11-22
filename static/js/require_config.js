requirejs.config({

    urlArgs: "bust=" +  (new Date()).getTime(),

    baseUrl	: '/static/js/app',

    paths   : {
	    jquery          : '/static/js/lib/jquery/dist/jquery', 
	    underscore      : '/static/js/lib/underscore/underscore', 
	    backbone        : '/static/js/lib/backbone/backbone',
		backbone_mfu	: '/static/js/lib/backbone_mfu/backbone-model-file-upload',
	    syphon    	    : '/static/js/lib/backbone.syphon/lib/backbone.syphon',
	    marionette      : '/static/js/lib/backbone.marionette/lib/backbone.marionette',
	    cookies			: '/static/js/lib/js-cookie/src/js.cookie',
	    promise			: 'https://www.promisejs.org/polyfills/promise-6.1.0',
	    spin 			: '/static/js/lib/spin/spin',
	    alertify		: '/static/js/lib/alertify/lib/alertify.min'
	}, 

	shim    : {
		cookies: {
			exports		: 'Cookies'
		},
		jquery: {
			deps 		: ['cookies']
		},
	    backbone: {
	        deps        : ['jquery', 'underscore'], 
	        exports     : 'Backbone'
	    },
		backbone_mfu: {
			deps		: ['jquery', 'underscore', 'backbone'],
			exports		: 'BackboneMfu'
		},
	    syphon: {
	    	deps		: ['backbone'],
	    	exports		: 'Syphon'
	    },
	    marionette: {
	        deps        : ['backbone'], 
	        exports     : 'Marionette'
	    },
	    promise: {
	    	exports		: 'Promise'
	    },
	    alertify: {
	    	exports		: 'Alertify'
	    }
	}
});


requirejs(['main'], function(App){
	App.start();
});
