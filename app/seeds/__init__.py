from flask.cli import AppGroup
from .users import seed_users, undo_users
from .servers import seed_servers, undo_servers
from .channels import seed_channels, undo_channels
from .user_server_membership import seed_user_server_memberships, undo_user_server_memberships
from .messages import seed_messages, undo_messages
from app.models.db import db, environment, SCHEMA

seed_commands = AppGroup('seed')

@seed_commands.command('all')
def seed():
    if environment == 'production':
        undo_messages
        undo_user_server_memberships()
        undo_channels()
        undo_servers()
        undo_users()

    seed_users()
    seed_servers()
    seed_channels()
    seed_user_server_memberships()
    seed_messages

@seed_commands.command('undo')
def undo():
    undo_messages
    undo_user_server_memberships()
    undo_channels()
    undo_servers()
    undo_users()