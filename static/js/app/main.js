define(['jquery' ,'backbone', 'marionette', 'app', 'models/car'],
    function ($, Backbone, Marionette, App) {

        App.Car = Backbone.Model.extend({});

        App.CarCollection = Backbone.Collection.extend({
            model: App.Car,
            comparator: function(car){
                // можно просто передать поле например: 'model'
                return car.get('model')
            }
        })

        App.CarItemView = Marionette.ItemView.extend({
            tagName: 'tr',
            template: '#car-list-template'
        });    

        App.CarsView = Marionette.CompositeView.extend({
            tagName                 : 'table',
            className               : 'table',
            template                : '#car-template',
            childView               : App.CarItemView,
            childViewContainer      : 'tbody'
        });

        // Start history when our application is ready
        App.on('start', function() {
            Backbone.history.start();


            App.request('getAlert');

            var cars  = new App.CarCollection([
                {
                    photo: [
                        "media/98414_YizsPRk.jpg"
                    ],
                    model: "Toyota",                
                    price: 100, 
                    description: "description", 
                    year: "2015-11-19",
                    createdAt: "2015-11-19"
                },
                {
                    photo: [
                        "media/подушка.jpg"
                    ],
                    model: "Nissan Wuotar",                
                    price: 200, 
                    description: "description", 
                    year: "2015-11-19",
                    createdAt: "2015-11-19"
                },
                {
                    photo: [
                        "media/98414_YizsPRk.jpg"
                    ],
                    model: "Dooyota",                
                    price: 100, 
                    description: "description", 
                    year: "2015-11-19",
                    createdAt: "2015-11-19"
                },
                {
                    photo: [
                        "media/подушка.jpg"
                    ],
                    model: "Nissan Pulsar",                
                    price: 200, 
                    description: "description", 
                    year: "2015-11-19",
                    createdAt: "2015-11-19"
                },
                {
                    photo: [
                        "media/98414_YizsPRk.jpg"
                    ],
                    model: "Fasha Su",                
                    price: 100, 
                    description: "description", 
                    year: "2015-11-19",
                    createdAt: "2015-11-19"
                },
                {
                    photo: [
                        "media/подушка.jpg"
                    ],
                    model: "Grom pod Vami",                
                    price: 200, 
                    description: "description", 
                    year: "2015-11-19",
                    createdAt: "2015-11-19"
                }
            ]);

            var carsView = new App.CarsView({
                collection: cars
            });

            App.mainRegion.show(carsView);
        });

        return App;

    }
);
