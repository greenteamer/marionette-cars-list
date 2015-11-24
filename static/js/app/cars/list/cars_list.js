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

            initialize: function(){
                var tags = this.collection;
                tags.on('next', this.next, this);
                console.log('tags.pager(): ', tags.pager());
            },

            events: {
                'click a#next': 'next'
            },

            next: function(e){
                e.preventDefault();
                console.log('next start');
                this.trigger('cars:next');
            }
        });


	});

});