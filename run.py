# /Users/elya/Desktop/aa-projects/_AA_Banter/Banter/run.py

from app import app, socketio

if __name__ == '__main__':
    socketio.run(app, debug=True)
