define(['alertify', 'jquery', 'backbone', 'marionette', 'app'], function (Alertify, $, Backbone, Marionette, App) {
	App.module('CarsApp.Show', function (Show, App, Backbone, Marionette) {
		Show.Controller = {
			showCar: function (id) {

				// показываем loading
				var loadingView = new App.Common.Views.Loading();
				App.mainRegion.show(loadingView);

				var promise = App.request('cars:entity', id);
				
				promise.then(function(car){
					// обработка promise. решение проблемы ассинхронности			
					var carView;
					if (car !== undefined) {
						carView = new Show.Car({
							model: car
						});	
						App.mainRegion.show(carView);

						carView.on('car:delete', function (model){
							// функция удлаения модели
		                    var message = 'Вы уверены что хотите удалить это авто?'
		                    Alertify.confirm(message, function(e){
		                        if (e) {
		                            model.destroy({
		                            	success: function(){
		                            		// после успешного удаления отправляем на главную стр
		                            		Alertify.success('Авто успешно удалено!');		                            		
		                            		App.trigger('cars:list');
		                            	}
		                            });
		                        }else{
		                            Alertify.error('Авто не удалено!'); 
		                        }
		                    });
		                });
					} else {
						carView = new Show.MissingCar({});
						App.mainRegion.show(carView);	
					}					
				});	

				
			}
		}
	})
})