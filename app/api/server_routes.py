from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, Server, User
from app.forms.server_form import ServerForm

server_routes = Blueprint('servers', __name__)

@server_routes.route('/', methods=['POST'])
@login_required
def create_server():
    form = ServerForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        server = Server(
            name=form.data['name'],
            description=form.data['description'],
            avatar_url=form.data['avatar_url'],
            banner_url=form.data['banner_url'],
            category=form.data['category'],
            creator_id=current_user.id,
        )
        db.session.add(server)
        db.session.commit()
        return jsonify(server.to_dict()), 201
    return {'errors': form.errors}, 400

@server_routes.route('/', methods=['GET'])
@login_required
def get_servers():
    servers = Server.query.all()
    joined_servers = [server.id for server in current_user.joined_servers]
    return jsonify({
        'servers': [server.to_dict() for server in servers],
        'joined_servers': joined_servers
    })

@server_routes.route('/<int:id>', methods=['GET'])
@login_required
def get_server(id):
    server = Server.query.get(id)
    if server:
        return jsonify(server.to_dict())
    return {'error': 'Server not found'}, 404

@server_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_server(id):
    server = Server.query.get(id)
    if server and server.creator_id == current_user.id:
        form = ServerForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            server.name = form.data['name']
            server.description = form.data['description']
            server.avatar_url = form.data['avatar_url']
            server.banner_url = form.data['banner_url']
            server.category = form.data['category']
            db.session.commit()
            return jsonify(server.to_dict())
        return {'errors': form.errors}, 400
    return {'error': 'Server not found or unauthorized'}, 404

@server_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_server(id):
    server = Server.query.get(id)
    if server and server.creator_id == current_user.id:
        db.session.delete(server)
        db.session.commit()
        return {'message': 'Server deleted'}
    return {'error': 'Server not found or unauthorized'}, 404

@server_routes.route('/<int:id>/join', methods=['POST'])
@login_required
def join_server(id):
    server = Server.query.get(id)
    if server:
        current_user.joined_servers.append(server)
        db.session.commit()
        return {'message': 'Joined server'}
    return {'error': 'Server not found'}, 404

@server_routes.route('/<int:id>/leave', methods=['POST'])
@login_required
def leave_server(id):
    server = Server.query.get(id)
    if server:
        current_user.joined_servers.remove(server)
        db.session.commit()
        return {'message': 'Left server'}
    return {'error': 'Server not found'}, 404
