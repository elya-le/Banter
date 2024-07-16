from flask.cli import AppGroup
from .users import seed_users, undo_users
from .servers import seed_servers, undo_servers
from .channels import seed_channels, undo_channels
from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
seed_commands = AppGroup('seed')

# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Undo all tables first in production
        undo_channels()
        undo_servers() 
        undo_users()

    seed_users()
    seed_servers() 
    seed_channels()

# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_channels()
    undo_servers() 
    undo_users()
