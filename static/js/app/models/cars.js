define(['backbone', 'backbone_pag', 'marionette', 'promise', 'app'], function(Backbone, BackbonePag, Marionette, Promise, App){

	console.log(App);

	App.module("Entities", function(Entities, App, Backbone, Marionette, $, _){
		Entities.Car = Backbone.Model.extend({
            urlRoot: 'api/v1/cars/'
        });

	    Entities.CarCollection = Backbone.PageableCollection.extend({
            url: 'api/v1/cars/',
	        model: Entities.Car,
            state: {
                pageSize: 5,
                firstPage: 1
            },
            mode: "client",

	        comparator: function(car){
	            // можно просто передать поле например: 'model'
	            return car.get('model');
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
			getCarEntities: function (number) {
                console.log('API getCarEntities number: ', number);
				var cars = new Entities.CarCollection();  
                return new Promise(function(resolve){

                    if (!number) {
                        number = 1;
                    }
                    cars.getPage(parseInt(number), {
                        fetch: true,
                        success: function(data){
                            resolve(data);
                        },
                        error: function () {
                            resolve(undefined);
                        }
                    });
                    //cars.setSorting('price');
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

        App.reqres.setHandler('cars:entities', function (number) {
            console.log('API getCarEntitiesApp.reqres.setHandler cars:entities number: ', number);
            return API.getCarEntities(number);
        });

        App.reqres.setHandler('cars:entity', function(id){
            return API.getCarEntity(id);
        });


        App.reqres.setHandler('car:isUnique', function(attrModel){
            return API.uniqueModel(attrModel);
        });

	});

});