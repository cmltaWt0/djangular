from django.shortcuts import render
from django.views.generic import View
from django.http import HttpResponse

from ui.api import getMessages


class Index(View):
    """
    Main View.
    """
    template_name = 'index.html'

    def get(self, request):
        return render(request, self.template_name, {})


class GetMessages(View):
    def get(self, request):
        return HttpResponse(content=getMessages())
