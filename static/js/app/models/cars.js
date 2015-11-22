define(['backbone', 'marionette', 'promise', 'app'], function(Backbone, Marionette, Promise, App){

	console.log(App);

	App.module("Entities", function(Entities, App, Backbone, Marionette, $, _){
		Entities.Car = Backbone.Model.extend({
            urlRoot: 'api/v1/cars/'
        });

	    Entities.CarCollection = Backbone.Collection.extend({
            url: 'api/v1/cars/',
	        model: Entities.Car,
                
	        comparator: function(car){
	            // можно просто передать поле например: 'model'
	            return car.get('model')
	        }
	    });

	    var cars;

	    var initializeCars = function () {
	    	cars = new Entities.CarCollection([
	    		{
                    id: 1,
                    photo: [
                        "media/98414_YizsPRk.jpg"
                    ],
                    model: "Toyota",                
                    price: 100, 
                    description: "description", 
                    year: "2015-11-19",
                    createdAt: "2015-11-19"
                }
	    	]);

            return cars;
	    };

		var API = {
			getCarEntities: function () {
				var cars = new Entities.CarCollection();  
                return new Promise(function(resolve){              
                    cars.fetch({
                        success: function(data){
                            resolve(data);      
                        },
                        error: function () {
                            resolve(undefined);
                        }
                    });
                });
			},
            getCarEntity: function (carId) {
                var car = new Entities.Car({id: carId});
                return new Promise(function(resolve){
                    car.fetch({
                        success: function  (data) {
                            resolve(data);
                        },
                        error: function  () {
                            resolve(undefined);
                        }
                    });
                });
            },
            uniqueModel: function(attrModel){
                // функция проверки на уникальность атрибута model
                // как всегда Promise выручает в асинхроне
                // в данном случае мы возвращаем объект Promise для 
                // конечного результата
                // внутри него же мы ловим выполненое обещание от получения всех моделей коллекции
                var self = this;
                return new Promise(function(resolve){

                    var promise = self.getCarEntities();
                    promise.then(function(cars){
                        var isDupl = _.some(cars.models, function(car){
                            return attrModel === car.attributes.model;
                        });
                        resolve(!isDupl);
                    });

                });
                
            }
		};

        App.reqres.setHandler('cars:entities', function () {
            return API.getCarEntities();
        });

        App.reqres.setHandler('cars:entity', function(id){
            return API.getCarEntity(id);
        });

        App.reqres.setHandler('car:isUnique', function(attrModel){
            return API.uniqueModel(attrModel);
        });

	});

});