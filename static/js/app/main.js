define(
    [
        'jquery',
        'backbone',
        'marionette',    
        'app',

        // models
        'models/cars',
        'models/photo',
        'models/pages',

        'cars/list/cars_list',
        'cars/list/cars_list_controller', 
        'cars/show/car_show_view',
        'cars/show/car_show_controller',
        'cars/cars_app',
        'cars/create/cars_create_view',
        'cars/create/cars_create_controller',
        'cars/edit/cars_edit_view',
        'cars/edit/cars_edit_controller',

        'pages/pages_app',
        'pages/show/page_show_view',
        'pages/show/page_show_controller',
        'pages/edit/page_edit_view',
        'pages/edit/page_edit_controller',

        'common/views'        
    ],

    function ($, Backbone, Marionette, App) {

        App.navigate = function(route, options){
            options || (options = {});
            Backbone.history.navigate(route, options);
        };

        App.getCurrentRoute = function(){
            return Backbone.history.fragment;
        };

        // Start history when our application is ready
        App.on('start', function() {
            if (Backbone.history) {
                Backbone.history.start();    

                if (this.getCurrentRoute() === '') {
                    App.trigger('cars:list');
                };
            };
                        
        });

        return App;
    }
);
