define(['jquery', 'backbone', 'marionette', 'app'], function ($, Backbone, Marionette, App) {
	App.module('CarsApp', function (CarsApp,  App, Backbone, Marionette, $) {
		
		CarsApp.Router = Marionette.AppRouter.extend({
			appRoutes: {
				'': 'listCars',
				'car/create': 'createCar',
				'car/:id/edit': 'editCar',
				'car/:id': 'showCar'
				
			}
		});

		var API = {
			listCars: function(){
				CarsApp.List.Controller.listCars();
			},
			showCar: function (id) {
				CarsApp.Show.Controller.showCar(id);
			},
			createCar: function () {
				CarsApp.Create.Controller.createCar();
			},
			editCar: function (id) {
				CarsApp.Edit.Controller.editCar(id);
			}
		};

		App.on('cars:list', function(){
			App.navigate('');
			API.listCars();
		});

		App.on('car:show', function(id){
			App.navigate('car/' + id);
			API.showCar(id);
		});

		App.on('car:create', function(){
			App.navigate('car/create');
			API.createCar();
		});

		App.on('car:edit', function(id){
			App.navigate('car/'+ id +'/edit');
			API.editCar();
		});

		App.on('before:start', function () {
			new CarsApp.Router({
				controller: API
			});
		});

	});
});