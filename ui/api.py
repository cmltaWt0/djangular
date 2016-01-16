import json
from ui.models import Message


def getMessages():
    qs = Message.objects.all()
    ret = [{'id': i.id, 'text': i.text} for i in qs]
    return json.dumps(ret)
