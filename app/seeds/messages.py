from app.models import db, Message, Channel, environment, SCHEMA
from sqlalchemy.sql import text

def seed_messages():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.messages RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM messages"))
    db.session.commit()

    channels = Channel.query.all()
    messages = [
        Message(user_id=1, channel_id=channel.id, content='Hello, everyone!') for channel in channels
    ] + [
        Message(user_id=2, channel_id=channel.id, content='Welcome to the channel!') for channel in channels
    ]

    db.session.bulk_save_objects(messages)
    db.session.commit()

def undo_messages():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.messages RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM messages"))
    db.session.commit()