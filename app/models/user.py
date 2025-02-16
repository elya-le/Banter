from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from sqlalchemy import func
from .user_server_membership import user_server_membership
from .message import Message  # <--- this has been updated to include Message model


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    avatar_url = db.Column(db.String(255), nullable=True)
    status = db.Column(db.String(255), nullable=True)
    created_at = db.Column(db.DateTime, server_default=func.now())
    updated_at = db.Column(db.DateTime, server_default=func.now(), onupdate=func.now())

    servers = db.relationship('Server', back_populates='creator', cascade='all, delete-orphan')
    joined_servers = db.relationship('Server', secondary=user_server_membership, back_populates='members')
    messages = db.relationship('Message', back_populates='author', cascade='all, delete-orphan')  # <--- this has been updated to include messages relationship

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'avatar_url': self.avatar_url,
            'status': self.status,
            'servers': [server.to_dict() for server in self.servers],
            'joined_servers': [server.to_dict() for server in self.joined_servers],
            'messages': [message.to_dict() for message in self.messages],  # <--- this has been updated to include messages
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        }