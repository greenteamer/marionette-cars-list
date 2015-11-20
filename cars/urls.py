from django.conf.urls import patterns, include, url


urlpatterns = patterns('cars.views',
    url(r'^$', 'indexView',
        {'template_name': 'cars/index.html'},
        name='viewindex')
)
