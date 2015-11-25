define(['backbone', 'promise', 'app'], function(Backbone, Promise, App){

	App.module("Entities", function(Entities, App, Backbone){
		Entities.Page = Backbone.Model.extend({
            urlRoot: 'api/v1/pages/'
        });

		var API = {
            getPageEntity: function (id) {

                var page = new Entities.Page({id: id});
                console.log('API getPageEntity slug: , page:', id, page);
                return new Promise(function(resolve){
                    page.fetch({
                        success: function  (data) {
                            resolve(data);
                        },
                        error: function  () {
                            resolve(undefined);
                        }
                    });
                });
            }
		};


        App.reqres.setHandler('pages:entity', function(id){
            return API.getPageEntity(id);
        });

	});

});