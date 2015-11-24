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
				};
				var model = new App.Entities.Car(emptyObj);
				// console.log('start createCar model: ', model);
				var createCar = new Create.Car({
					model: model
				});
				App.mainRegion.show(createCar);

				createCar.on('cars:create', function(formData, modelName){
					var model = new App.Entities.Car();

					// проверка на уникальность (метод в модели)
					var promise = App.request('car:isUnique', modelName);
					promise.then(function(isUnique){
						if (isUnique) {

							model.save(null, {
                                data: formData,
                                contentType: false,
                                processData: false,
                                success: function(data){
                                    // после успешного сохранения модели сохраняем фото для нее

                                    var photo = new App.Entities.Photo();
                                    formData.append('car', data.id);
                                    photo.save(null, {
                                        data: formData,
                                        contentType: false,
                                        progressData: false,
                                        success: function(data){

                                            Alertify.success('Модель успешно создана!');
                                            App.trigger('cars:list');
                                        }
                                    });
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