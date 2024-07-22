from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import func

class Message(db.Model):
    __tablename__ = 'messages'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(2000), nullable=False)
    author_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    channel_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('channels.id')), nullable=False)
    created_at = db.Column(db.DateTime, server_default=func.now())
    updated_at = db.Column(db.DateTime, server_default=func.now(), onupdate=func.now())

    author = db.relationship('User', back_populates='messages')  # <--- this has been added for message-author relationship
    channel = db.relationship('Channel', back_populates='messages')  # <--- this has been added for message-channel relationship

    def to_dict(self):
        return {
            'id': self.id,
            'content': self.content,
            'author_id': self.author_id,
            'channel_id': self.channel_id,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'author': {
                'id': self.author.id,
                'username': self.author.username
            }  # <--- this has been updated to include author details
        }