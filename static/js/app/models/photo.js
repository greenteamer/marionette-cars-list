define(['backbone', 'marionette', 'promise', 'app'], function(Backbone, Marionette, Promise, App){

	console.log(App);

	App.module("Entities", function(Entities, App, Backbone, Marionette, $, _){
		Entities.Photo = Backbone.Model.extend({
            urlRoot: 'api/v1/photo/'
        });

	    Entities.PhotoCollection = Backbone.Collection.extend({
            url: 'api/v1/photo/',
	        model: Entities.Photo
	    });

	    var photo;

	    var initializePhoto = function () {
	    	photo = new Entities.PhotoCollection([
	    		{
                    "id": 6,
                    "car": 15,
                    "image": "http://127.0.0.1:8000/media/media/c1626aad096e493e978d36b8b0ba322a.jpg"
                },
	    	]);

            return photo;
	    };

		var API = {
			getPhotoEntities: function () {
				var photos = new Entities.PhotoCollection();  
                return new Promise(function(resolve){              
                    photos.fetch({
                        success: function(data){
                            resolve(data);      
                        },
                        error: function () {
                            resolve(undefined);
                        }
                    });
                });
			},
            getPhotoEntity: function (id) {
                var photo = new Entities.Photo({id: id});
                return new Promise(function(resolve){
                    photo.fetch({
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

        App.reqres.setHandler('photo:entities', function () {
            return API.getPhotoEntities();
        });

        App.reqres.setHandler('photo:entity', function(id){
            return API.getPhotoEntity(id);
        });

	});

});