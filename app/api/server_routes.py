from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, Server, User
from app.forms.server_form import ServerForm
from app.utils.s3_helper import upload_file_to_s3, allowed_file

server_routes = Blueprint('servers', __name__)

@server_routes.route('/', methods=['POST'])
@login_required
def create_server():
    form = ServerForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        avatar_url = None
        if 'avatar' in request.files and allowed_file(request.files['avatar'].filename):
            upload_result = upload_file_to_s3(request.files['avatar'], 'avatars/servers')
            if "url" in upload_result:
                avatar_url = upload_result["url"]
            else:
                return jsonify(upload_result), 400

        server = Server(
            name=form.data['name'],
            description=form.data['description'],
            avatar_url=avatar_url,
            creator_id=current_user.id,
        )
        db.session.add(server)
        current_user.joined_servers.append(server)  # automatically join the server when it is created
        db.session.commit()
        return jsonify(server.to_dict()), 201
    return {'errors': form.errors}, 400

@server_routes.route('/', methods=['GET'])
@login_required  # ensure user is logged in
def get_servers():
    servers = Server.query.all()  # fetch all servers from the database
    joined_servers = [server.id for server in current_user.joined_servers]  # list of IDs of servers the user has joined
    all_servers = [server.to_dict() for server in servers]  # all servers as dictionaries
    not_joined_servers = [server.to_dict() for server in servers if server.id not in joined_servers]  # servers not joined by the user

    return jsonify({
        'all_servers': all_servers,
        'joined_servers': joined_servers,
        'not_joined_servers': not_joined_servers
    })  # return JSON with all, joined, and not joined servers


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
            
            # handle avatar upload
            if 'avatar' in request.files and allowed_file(request.files['avatar'].filename):
                avatar_file = request.files['avatar']
                avatar_upload = upload_file_to_s3(avatar_file, 'avatars/servers')
                if "url" in avatar_upload:
                    server.avatar_url = avatar_upload["url"]
                else:
                    return jsonify(avatar_upload), 400  # return error if upload failed

            # handle banner upload
            if 'banner' in request.files and allowed_file(request.files['banner'].filename):
                banner_file = request.files['banner']
                banner_upload = upload_file_to_s3(banner_file, 'banners/servers')
                if "url" in banner_upload:
                    server.banner_url = banner_upload["url"]
                else:
                    return jsonify(banner_upload), 400  # return error if upload failed

            server.category = form.data.get('category', server.category)
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

@server_routes.route('/<int:id>/join', methods=['POST'])  # --------- endpoint to join a server
@login_required
def join_server(id):
    server = Server.query.get(id)
    if server:
        current_user.joined_servers.append(server)
        db.session.commit()
        return {'message': 'Joined server', 'server': server.to_dict()}
    return {'error': 'Server not found'}, 404

@server_routes.route('/<int:id>/leave', methods=['POST'])   # --------- endpoint to leave a server
@login_required
def leave_server(id):
    server = Server.query.get(id)
    if server:
        current_user.joined_servers.remove(server)
        db.session.commit()
        return {'message': 'Left server', 'serverId': id}
    return {'error': 'Server not found'}, 404