define(['jquery', 'backbone', 'marionette', 'app'], function ($, Backbone, Marionette, App) {
	App.module('CarsApp.Show', function(Show, App, Backbone, Marionette, $){

		Show.MissingCar = Marionette.ItemView.extend({
			template: '#missing-car-template'
		});

		Show.Car = Marionette.ItemView.extend({
			template: '#car-show-template',
			events: {
				'click button#car-delete': 'deleteCar'
			},
			deleteCar: function(e){
				e.preventDefault();
				this.trigger('car:delete', this.model);
			}
		});
	});
})