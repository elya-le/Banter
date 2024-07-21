from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import func
from .message import Message  # <--- this has been updated to include Message model

class Channel(db.Model):
    __tablename__ = 'channels'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    server_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('servers.id')), nullable=False)
    created_at = db.Column(db.DateTime, server_default=func.now())
    updated_at = db.Column(db.DateTime, server_default=func.now(), onupdate=func.now())

    server = db.relationship('Server', back_populates='channels')
    messages = db.relationship('Message', back_populates='channel', cascade='all, delete-orphan')  # <--- this has been updated to include messages relationship

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'server_id': self.server_id,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'messages': [message.to_dict() for message in self.messages]  # <--- this has been updated to include messages
        }