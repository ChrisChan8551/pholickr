from flask_socketio import SocketIO, emit
import os

# Configure CORS origins
if os.environ.get('FLASK_ENV') == 'production':
    origins = [
        'http://pholickr.onrender.com',
        'https://pholickr.onrender.com'
    ]
else:
    origins = [
        'http://localhost:3000',
        'http://127.0.0.1:3000'
    ]


socketio = SocketIO(cors_allowed_origins=origins)


@socketio.on("chat")
def handle_chat(data):
    emit("chat", data)
