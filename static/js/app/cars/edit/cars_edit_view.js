define(['backbone', 'syphon', 'cookies', 'marionette', 'app'],
    function (Backbone, Syphon, Cookies, Marionette, App) {
        App.module('CarsApp.Edit', function (Edit) {

            Edit.Car = Marionette.ItemView.extend({
                template: '#car-form-template',

                events: {
                    'submit #edit-car-form': 'editCar',
                    'click button.deletePhoto': 'deletePhoto',
                    'submit #add-photo': 'addPhoto'
                },

                editCar: function(e){
                    e.preventDefault();
                    var data = Backbone.Syphon.serialize(this);
                    data.year = $('#year').val();
                    console.log('data: ', data);

                    if ($('#image').val() !== '') {
                        // проверка добавлялось ли новое фото
                        console.log('photo brunch');

                        data.formdata = new FormData($('form#edit-car-form').get(0));
                        data.formdata.append('car', this.model.attributes.id);

                        this.trigger('photo:add', data.formdata);
                        this.trigger('cars:edit', data);
                    }else{
                        console.log('without photo brunch, data: ', data);
                        this.trigger('cars:edit', data);
                    }

                },

                deletePhoto: function (e) {
                    e.preventDefault();
                    var id = e.target.id;
                    console.log(id);
                    this.trigger('photo:delete', id)
                },

                addPhoto: function (e) {
                    //e.preventDefault();


                    //var data = new FormData($('form#add-photo').get(0));
                    //var csrftoken = Cookies.get('csrftoken');
                    //data.append('car', this.model.attributes.id);
                    //data.append('csrfmiddlewaretoken', csrftoken);
                    //this.trigger('photo:add', data);


                    //console.log('first data: ', data);
                    //var files  = e.target.files;
                    //$.each(files, function(key, value)
                    //{
                        //data.append(key, value);
                    //});
                    //console.log('data: ', data);
                    //
                    //var data = Backbone.Syphon.serialize(this);
                    //console.log(data);
                    //
                    //
                    //var file2 = $(':input[type="file"]')[0].files[0];
                    //console.log('file2: ', file2);
                    //


                    //var data2 = new FormData($('form#add-photo').get(0));
                    //data2.append('car', this.model.attributes.id);
                    //
                    //var photo = new App.Entities.Photo({});
                    //photo.save(data2,{
                    //    iframe: true,
                    //    files: e.target.files,
                    //    data: data2
                    //});


                    //var files = this.$('form :file');
                    //console.log(files);
                    //var obj = {
                    //	image: data.image,
                    //	car: this.model.attributes.id
                    //};
                    //console.log(obj);
                    // this.model.save(values, { iframe: true,
        //                           files: this.$('form :file'),
        //                           data: values });

                }

            });

        })
});