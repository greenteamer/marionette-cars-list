define(['alertify', 'backbone', 'marionette', 'app'], function(Alertify, Backbone, Marionette, App){
	App.module('CarsApp.Create', function (Create, Backbone, Marionette) {
		Create.Controller = {
			createCar: function () {
				// do something
				// console.log('start createCar');
				var emptyObj = {
					id: 0,
					model: '',
					photo: [],
					price: 0,
					description: '',
					year: ''
				}
				var model = new App.Entities.Car(emptyObj);
				// console.log('start createCar model: ', model);
				var createCar = new Create.Car({
					model: model
				});
				App.mainRegion.show(createCar);

				createCar.on('cars:create', function(obj){
					var model = new App.Entities.Car(obj);

					// проверка на уникальность (метод в модели)
					var promise = App.request('car:isUnique', obj.model);
					promise.then(function(isUnique){
						if (isUnique) {
							model.save({},{
								success: function(){
									Alertify.success('Модель успешно создана!');	
									App.trigger('cars:list');
								}
							});
						}else{
							Alertify.alert('Модель с таким названием уже существует!');	
							Alertify.error('Модель не создана!');
						}
						
					});
					
					
				});
			}
		}
	})
});