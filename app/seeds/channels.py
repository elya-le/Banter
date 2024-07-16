from app.models import db, Channel, Server, environment, SCHEMA
from sqlalchemy.sql import text

def seed_channels():
    servers = Server.query.all()
    channels = []

    for server in servers:
        channels.append(Channel(name='General', server_id=server.id))

    db.session.bulk_save_objects(channels)
    db.session.commit()

def undo_channels():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.channels RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM channels"))
    db.session.commit()
