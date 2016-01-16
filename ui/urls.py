from django.conf.urls import url, patterns

from ui.views import Index, GetMessages


urlpatterns = patterns(
    '',
    url(r'^$', Index.as_view(), name='index'),
    url(r'^api/messages', GetMessages.as_view(), name='get_messages')
)
