define(['alertify', 'jquery', 'backbone', 'marionette', 'app'], function (Alertify, $, Backbone, Marionette, App) {
	App.module('CarsApp.Create', function (Create) {
		
		Create.Car = Marionette.ItemView.extend({
			template: '#car-form-template',

			events: {
				'submit form#edit-car-form': 'createCar'
			},

			createCar: function (e) {
				e.preventDefault();
				var obj = {
					model: $('#model').val(),
					price: $('#price').val(),
					description: $('#description').val(),
					year: $('#year').val()
				};
				var data = new FormData($('form#edit-car-form').get(0));
                data.append('year', $('#year').val());

                var modelName = $('#model').val();

				this.trigger('cars:create', data, modelName);
			}
		});

	});
});