from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, Channel, Server, Message
from app.forms.channel_form import ChannelForm

channel_routes = Blueprint('channels', __name__)

@channel_routes.route('/<int:server_id>', methods=['GET'])
@login_required
def get_channels(server_id):
    channels = Channel.query.filter_by(server_id=server_id).all()
    return jsonify([channel.to_dict() for channel in channels])

@channel_routes.route('/', methods=['POST'])
@login_required
def create_channel():
    form = ChannelForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        server = Server.query.get(form.data['server_id'])
        if server and server.creator_id == current_user.id:
            channel = Channel(
                name=form.data['name'],
                server_id=form.data['server_id']
            )
            db.session.add(channel)
            db.session.commit()
            return jsonify(channel.to_dict()), 201
        return {'error': 'Unauthorized or server not found'}, 403
    return {'errors': form.errors}, 400

@channel_routes.route('/<int:id>', methods=['GET'])
@login_required
def get_channel(id):
    channel = Channel.query.get(id)
    if channel:
        return jsonify(channel.to_dict())
    return {'error': 'Channel not found'}, 404

@channel_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_channel(id):
    channel = Channel.query.get(id)
    if channel:
        form = ChannelForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            server = Server.query.get(form.data['server_id'])
            if server and server.creator_id == current_user.id:
                channel.name = form.data['name']
                channel.server_id = form.data['server_id']  # make sure server_id is updated
                db.session.commit()
                return jsonify(channel.to_dict())
            return {'error': 'Unauthorized or server not found'}, 403
        return {'errors': form.errors}, 400
    return {'error': 'Channel not found'}, 404


@channel_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_channel(id):
    channel = Channel.query.get(id)
    if channel:
        server_id = channel.server_id  # save the server_id before deleting the channel
        server = Server.query.get(server_id)
        if server and server.creator_id == current_user.id:
            db.session.delete(channel)
            db.session.commit()
            return jsonify({'message': 'Channel deleted', 'server_id': server_id}), 200  # return server_id
        return {'error': 'Unauthorized'}, 403
    return {'error': 'Channel not found'}, 404


# -------- new routes for messages
@channel_routes.route('/<int:channel_id>/messages', methods=['GET'])
@login_required
def get_messages(channel_id):
    messages = Message.query.filter_by(channel_id=channel_id).order_by(Message.created_at).all()
    return jsonify([message.to_dict() for message in messages])

@channel_routes.route('/<int:channel_id>/messages', methods=['POST'])
@login_required
def post_message(channel_id):
    data = request.get_json()
    new_message = Message(
        author_id=current_user.id,  # <--- this has been updated to author_id
        channel_id=channel_id,  # <--- this has been updated to channel_id
        content=data['content']
    )
    db.session.add(new_message)
    db.session.commit()
    return jsonify(new_message.to_dict())

@channel_routes.route('/messages/<int:id>', methods=['DELETE'])
@login_required
def delete_message(id):
    message = Message.query.get(id)
    if message:
        if message.author_id == current_user.id:
            db.session.delete(message)
            db.session.commit()
            emit('messageDeleted', {'messageId': id}, broadcast=True)  # Emit the event
            return jsonify({'message': 'Message deleted'}), 200
        else:
            return jsonify({'error': 'Unauthorized'}), 403
    return jsonify({'error': 'Message not found'}), 404