# /Users/elya/Desktop/aa-projects/_AA_Banter/Banter/app/__init__.py

import os
from flask import Flask, render_template, request, session, redirect, current_app
from flask_cors import CORS
from flask_migrate import Migrate
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_login import LoginManager
from flask_socketio import SocketIO, send, emit
from .models import db, User
from .api.user_routes import user_routes
from .api.auth_routes import auth_routes
from .api.server_routes import server_routes
from .api.channel_routes import channel_routes
from .seeds import seed_commands
from .config import Config
import boto3
from botocore.exceptions import NoCredentialsError, PartialCredentialsError
from dotenv import load_dotenv

# load environment variables from .env file
load_dotenv()

app = Flask(__name__, static_folder='../react-vite/dist', static_url_path='/')
app.config.from_object(Config)

# setup flask-socketio
socketio = SocketIO(app, cors_allowed_origins="*")

# setup login manager
login = LoginManager(app)
login.login_view = 'auth.unauthorized'

@login.user_loader
def load_user(id):
    return User.query.get(int(id))

# tell flask about our seed commands
app.cli.add_command(seed_commands)

# register blueprints
app.register_blueprint(user_routes, url_prefix='/api/users')
app.register_blueprint(auth_routes, url_prefix='/api/auth')
app.register_blueprint(server_routes, url_prefix='/api/servers')
app.register_blueprint(channel_routes, url_prefix='/api/channels')

# initialize database and migration
db.init_app(app)
Migrate(app, db)

# verify aws s3 access
def verify_s3_access():
    s3_client = boto3.client(
        's3',
        aws_access_key_id=os.getenv('AWS_ACCESS_KEY_ID'),
        aws_secret_access_key=os.getenv('AWS_SECRET_ACCESS_KEY'),
        region_name=os.getenv('AWS_REGION')
    )
    try:
        s3_client.list_buckets()
        print("S3 Access Verified!")
    except (NoCredentialsError, PartialCredentialsError) as e:
        print(f"S3 Access Error: {e}")

verify_s3_access()

# application security
CORS(app)

# redirect http to https in production
@app.before_request
def https_redirect():
    if os.environ.get('FLASK_ENV') == 'production':
        if request.headers.get('X-Forwarded-Proto') == 'http':
            url = request.url.replace('http://', 'https://', 1)
            code = 301
            return redirect(url, code=code)

@app.after_request
def inject_csrf_token(response):
    response.set_cookie(
        'csrf_token',
        generate_csrf(),
        secure=True if os.environ.get('FLASK_ENV') == 'production' else False,
        samesite='Strict' if os.environ.get(
            'FLASK_ENV') == 'production' else None,
        httponly=True)
    return response

@app.route("/api/docs")
def api_help():
    """
    returns all api routes and their doc strings
    """
    acceptable_methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
    route_list = { rule.rule: [[ method for method in rule.methods if method in acceptable_methods ],
                    app.view_functions[rule.endpoint].__doc__ ]
                    for rule in app.url_map.iter_rules() if rule.endpoint != 'static' }
    return route_list

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def react_root(path):
    """
    this route will direct to the public directory in our
    react builds in the production environment for favicon
    or index.html requests
    """
    if path == 'favicon.ico':
        return app.send_from_directory('public', 'favicon.ico')
    return app.send_static_file('index.html')

@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')

# websocket events
@socketio.on('message')
def handle_message(message):
    print('received message: ' + message)
    send(message, broadcast=True)
