define(['alertify', 'jquery', 'backbone', 'marionette', 'app'], function (Alertify, $, Backbone, Marionette, App) {
	App.module('PagesApp.Show', function (Show, App) {
		Show.Controller = {
			showPage: function (id) {

				// показываем loading
				//var loadingView = new App.Common.Views.Loading();
				//App.mainRegion.show(loadingView);
                console.log('Show.Controller showPage id: ', id);

				var promise = App.request('pages:entity', id);
				
				promise.then(function(page){
					console.log('test page in promise: ', page)
					var pageView;
					if (page !== undefined) {
						pageView = new Show.Page({
							model: page
						});	
						App.mainRegion.show(pageView);
					}
				});	

				
			}
		}
	})
})