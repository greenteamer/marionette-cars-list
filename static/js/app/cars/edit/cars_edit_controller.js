define(['alertify', 'backbone', 'marionette', 'app'], function(Alertify, Backbone, Marionette, App) {
	App.module('CarsApp.Edit', function (Edit, Backbone, Marionette) {
		
		Edit.Controller = {
		
			editCar: function(carId){

				var promise = App.request('cars:entity', carId);
				promise.then(function(car){
					var editCar;
					if (car !== undefined) {						
						editCar = new Edit.Car({
							model: car
						});							
						App.mainRegion.show(editCar);

						// регистрируем функцию которая обновляет данные модели
						editCar.on('cars:edit', function(data){							
							var tmp_data = _.omit(data, 'image');
							car.set(tmp_data);
							car.save({},{
								success: function(){
				                   Alertify.success('Модлеь сохранена успешно!');
				                   App.trigger('car:show', carId);
								},
								error: function(){
				                    Alertify.error('При сохранении модели произошла ошибка!');
								}
							});
						});

						// регистрируем функцию которая удаляет фото
						editCar.on('photo:delete', function(id){							
							
							console.log('delete photo id: ',id);
							var promise = App.request('photo:entity', id);
							promise.then(function(photo){
								photo.destroy({
									success: function () {
										Alertify.success('Изображение удалено успешно!');
										editCar = new Edit.Car({
											model: car
										});
										App.mainRegion.show(editCar);
									}
								});
							});

						});

						// регистрируем функцию которая добавления фото
						editCar.on('photo:add', function(data){
							$.ajax({
								url: "/api/v1/photo/",
								method: "POST",
								data: data,
								success: function(data){
									Alertify.success('Изображение добавлено успешно!');
								},
								error: function(data){},
								processData: false,
								contentType: false
							});
							//var photo = new App.Entities.Photo({});
                            //
							//photo.save(obj);

						});


					} else {						
						editCar = new Edit.Car({});
						App.mainRegion.show(editCar);	
					}					
				});	

			}

		}

	})
})