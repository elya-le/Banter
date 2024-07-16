from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import func
from .user_server_membership import user_server_membership

class Server(db.Model):
    __tablename__ = 'servers'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(255), nullable=True)
    avatar_url = db.Column(db.String(255), nullable=True)
    banner_url = db.Column(db.String(255), nullable=True)
    category = db.Column(db.String(50), nullable=True)
    creator_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    created_at = db.Column(db.DateTime, server_default=func.now())
    updated_at = db.Column(db.DateTime, server_default=func.now(), onupdate=func.now())

    creator = db.relationship('User', back_populates='servers')
    members = db.relationship('User', secondary=user_server_membership, back_populates='joined_servers')
    channels = db.relationship('Channel', back_populates='server', cascade='all, delete-orphan')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'avatar_url': self.avatar_url,
            'banner_url': self.banner_url,
            'category': self.category,
            'creator_id': self.creator_id,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'members': [user.id for user in self.members]
        }
