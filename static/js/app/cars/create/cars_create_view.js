define(['alertify', 'jquery', 'backbone', 'marionette', 'app'], function (Alertify, $, Backbone, Marionette, App) {
	App.module('CarsApp.Create', function (Create) {
		
		Create.Car = Marionette.ItemView.extend({
			template: '#car-form-template',

			events: {
				'click button#car-form': 'createCar'
			},

			createCar: function (e) {
				e.preventDefault();
				var obj = {
					model: $('#model').val(),
					price: $('#price').val(),
					description: $('#description').val(),
					year: $('#year').val()
				};
				this.trigger('cars:create', obj);
			}
		});

	});
});