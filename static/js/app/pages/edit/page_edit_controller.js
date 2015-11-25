define(['alertify', 'backbone', 'marionette', 'app'], function(Alertify, Backbone, Marionette, App) {
	App.module('PagesApp.Edit', function (Edit) {

		Edit.Controller = {

			editPage: function(id){

				var promise = App.request('pages:entity', id);
				promise.then(function(page){
					var editPage;
					if (page !== undefined) {
						editPage = new Edit.Page({
							model: page
						});
						App.mainRegion.show(editPage);

						// регистрируем функцию которая обновляет данные модели
						editPage.on('pages:edit', function(data){

							page.set(data);
							page.save({},{
								success: function(data){
									console.log('test new test', data);
				                   	Alertify.success('Страница сохранена успешно!');
				                   	App.trigger('page:show', id);
								},
								error: function(){
				                    Alertify.error('При сохранении страницы произошла ошибка!');
								}
							});
						});

					} else {
						editPage = new Edit.Page({});
						App.mainRegion.show(editPage);
					}
				});

			}

		}

	})
})