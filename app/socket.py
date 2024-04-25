from flask_socketio import SocketIO, emit
import os

# Configure CORS origins
if os.environ.get('FLASK_ENV') == 'production':
    origins = [
        'http://pholickr.onrender.com/',
        'https://pholickr.onrender.com/'
    ]
else:
    origins = "*"


socketio = SocketIO(cors_allowed_origins=origins)


@socketio.on("chat")
def handle_chat(data):
    emit("chat", data, broadcast=True)
