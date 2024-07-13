from .db import db, environment, SCHEMA

if environment == "production":
    user_server_membership = db.Table(
        'user_server_membership',
        db.Column('user_id', db.Integer, db.ForeignKey(f'{SCHEMA}.users.id'), primary_key=True),
        db.Column('server_id', db.Integer, db.ForeignKey(f'{SCHEMA}.servers.id'), primary_key=True),
        schema=SCHEMA
    )
else:
    user_server_membership = db.Table(
        'user_server_membership',
        db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
        db.Column('server_id', db.Integer, db.ForeignKey('servers.id'), primary_key=True)
    )
