define(['alertify', 'backbone', 'marionette', 'app'], function (Alertify, Backbone, Marionette, App) {
    App.module('CarsApp.List', function (List, App, Backbone, Marionette) {

        List.Controller = {            

            listCars: function(number){

                console.log('test number in controller: ', number);

                var loadingView = new App.Common.Views.Loading();
                App.mainRegion.show(loadingView);

                var promise = App.request('cars:entities', number);
                promise.then(function(cars){
                    console.log('currentPage: ', cars.state.currentPage);
                    console.log('Page count: ', cars.state.totalPages);
                    var carsView = new List.Cars({
                        collection: cars,

                        templateHelpers: function() {
                            // передаем колличество страниц в шаблон
                            return { pages: cars.state.totalPages };
                        }

                    });

                    carsView.on('childview:car:delete', function (childview, model){
                        var message = 'Вы уверены что хотите удалить это авто?'
                        Alertify.confirm(message, function(e){
                            if (e) {
                                model.destroy();
                                Alertify.success('Авто успешно удалено!');
                            }else{
                                Alertify.error('Авто не удалено!'); 
                            }
                        });
                    });

                    carsView.on('childview:car:show', function (childview, model) {
                        App.trigger('car:show', model.get('id'));
                    });

                    carsView.on('cars:sorting', function(field){
                        console.log('sorting');
                        //cars.getPage(cars.state.currentPage);
                        // Assign new comparator
                        this.collection.comparator = function(model) {
                          return model.get(field);
                        };
                        this.collection.sort();
                    });

                    carsView.on('cars:next', function(){
                        cars.getNextPage();
                    });

                    carsView.on('cars:previous', function(){
                        cars.getPreviousPage();
                    });

                    App.mainRegion.show(carsView);
                });

            }
        }

    });
});