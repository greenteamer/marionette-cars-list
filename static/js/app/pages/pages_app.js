define(['jquery', 'backbone', 'marionette', 'app'], function ($, Backbone, Marionette, App) {
	App.module('PagesApp', function (PagesApp,  App, Backbone, Marionette, $) {
		
		PagesApp.Router = Marionette.AppRouter.extend({
			appRoutes: {
                'page/create': 'createPage',
				'page/:id': 'showPage',
				'page/:id/edit': 'editPage'
			}
		});

		var API = {
			// Pages API
            showPage: function (id) {
				PagesApp.Show.Controller.showPage(id);
			},
            createPage: function () {
				PagesApp.Create.Controller.createPage();
			},
            editPage: function (id) {
				PagesApp.Edit.Controller.editPage(id);
			}
		};

        //pages
        App.on('page:show', function(id){
			App.navigate('page/' + id);
			API.showPage(id);
		});
        App.on('page:create', function(){
			App.navigate('page/create');
			API.createPage();
		});

		App.on('page:edit', function(id){
			App.navigate('page/'+ id +'/edit');
			API.editPage();
		});

        //common
		App.on('before:start', function () {
			new PagesApp.Router({
				controller: API
			});
		});

	});
});