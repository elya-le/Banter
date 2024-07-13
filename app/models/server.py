from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import func

class Server(db.Model):
    __tablename__ = 'servers'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(255), nullable=True)
    creator_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    created_at = db.Column(db.DateTime, server_default=func.now())
    updated_at = db.Column(db.DateTime, server_default=func.now(), onupdate=func.now())

    creator = db.relationship('User', back_populates='servers')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'creator_id': self.creator_id,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        }
