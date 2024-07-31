# /Users/elya/Desktop/aa-projects/_AA_Banter/Banter/app/socket.py
from flask_socketio import SocketIO, emit
import os
from flask import Flask
from flask_cors import CORS

# Set CORS origins based on environment
if os.environ.get('FLASK_ENV') == 'production':
    origins = ['https://elya-le-banter.onrender.com']
else:
    origins = ['http://localhost:5173']

# Initialize Flask app
def create_app():
    app = Flask(__name__)
    CORS(app, resources={r"/*": {"origins": origins}}, supports_credentials=True)
    return app

app = create_app()
socketio = SocketIO(app, cors_allowed_origins=origins, logger=True, engineio_logger=True)

# Handle chat messages
@socketio.on("chat")
def handle_chat(data):
    print(f"Received chat message: {data}")
    emit("chat", data, broadcast=True)
