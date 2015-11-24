define(['alertify', 'backbone', 'marionette', 'app'], function (Alertify, Backbone, Marionette, App) {
    App.module('CarsApp.List', function (List, App, Backbone, Marionette) {

        List.Controller = {            

            listCars: function(){

                var loadingView = new App.Common.Views.Loading();
                App.mainRegion.show(loadingView);   

                // var cars = App.request('cars:entities');
                var promise = App.request('cars:entities');

                promise.then(function(cars){
                    console.log('currentPage: ', cars.state.currentPage);

                    var carsView = new List.Cars({
                        collection: cars
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

                    //carsView.on('cars:next', function () {
                    //    console.log('next cars request');
                    //    var nextPromise = App.request('cars:nextPage');
                    //    nextPromise.then(function(nextCars){
                    //        carsView = new List.Cars({
                    //            collection: nextCars
                    //        });
                    //        console.log(nextCars.state.currentPage);
                    //    });
                    //
                    //});


                    App.mainRegion.show(carsView);
                });

            }
        }

    });
});