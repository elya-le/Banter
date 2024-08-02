# run.py
import eventlet
eventlet.monkey_patch()  # this must be called before any other imports

import select  # import select after monkey patching
from app import app, socketio

if __name__ == '__main__':
    print("Starting server with Eventlet...")
    socketio.run(app, host='0.0.0.0', port=int(os.environ.get('PORT', 5001)))  # use the PORT environment variable for production
