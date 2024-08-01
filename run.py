# run.py
import eventlet
eventlet.monkey_patch()  # this must be called before any other imports

import select  # import select after monkey patching
from app import app, socketio

if __name__ == '__main__':
    print("Starting server with Eventlet...")
    socketio.run(app, host='0.0.0.0', port=5001)  # <-- this has been updated to use Eventlet
