define(['backbone', 'marionette', 'app'], function(Backbone, Marionette, App) {

	App.module('CarsApp.List', function (List, App, Backbone, Marionette) {


		List.Car = Marionette.ItemView.extend({
            tagName: 'tr',
            template: '#car-list-template',

            events: {
            	'click': 'highlightName',
                'click td a#car-show': 'showCar',
            	'click button#car-delete': 'deleteCar'
            },

            deleteCar: function () {
        		this.trigger('car:delete', this.model);
        	},

        	remove: function () {
        		var self = this;
        		this.$el.fadeOut(function(){
        			Marionette.ItemView.prototype.remove.call(self);
        		});
        	},

            showCar: function (e) {
                e.preventDefault();
                this.trigger('car:show', this.model);
            },



            // onDestroy: function(){
            //     var self = this;
            //     this.$el.fadeOut(function(){
            //         Marionette.ItemView.prototype.remove.call(self);
            //     })
            // }

        });

        List.Cars = Marionette.CompositeView.extend({
            tagName                 : 'div',
            className               : 'table',
            template                : '#car-template',
            childView               : List.Car,
            childViewContainer      : 'tbody',

            sort: function(){
                console.log('sort method in view');
                self.render();
            },

            events: {
                'change #sorting': 'sorting',
                'click #next': 'next',
                'click #previous': 'previous'
            },

            sorting: function(e){
                e.preventDefault();
                this.trigger('cars:sorting', e.target.value);
            },
            next: function(e){
                e.preventDefault();
                this.trigger('cars:next');
            },
            previous: function(e){
                e.preventDefault();
                this.trigger('cars:previous');
            }

        });


	});

});