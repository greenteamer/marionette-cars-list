define(['jquery', 'backbone', 'marionette', 'app'], function ($, Backbone, Marionette, App) {
	App.module('PagesApp.Show', function(Show, App, Backbone, Marionette, $){

		Show.Page = Marionette.ItemView.extend({
			template: '#page-show-template'
		});
	});
})