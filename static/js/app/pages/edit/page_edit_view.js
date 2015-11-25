define(['backbone', 'syphon', 'cookies', 'marionette', 'app'],
    function (Backbone, Syphon, Cookies, Marionette, App) {
        App.module('PagesApp.Edit', function (Edit) {

            Edit.Page = Marionette.ItemView.extend({
                template: '#page-form-template',

                events: {
                    'submit #add-page-form': 'editPage'
                },

                editPage: function(e){
                    e.preventDefault();
                    var data = Backbone.Syphon.serialize(this);
                    this.trigger('pages:edit', data);
                }

            });

        })
});