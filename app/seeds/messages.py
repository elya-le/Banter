from app.models import db, Message, User, Channel, environment, SCHEMA
from sqlalchemy.sql import text

def seed_messages():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.messages RESTART IDENTITY CASCADE;")  # <--- this has been updated for: truncate messages table in production
    else:
        db.session.execute(text("DELETE FROM messages"))  # <--- this has been updated for: delete all messages in non-production
    db.session.commit()

    # No messages to seed  # <--- this has been updated for: no messages will be seeded

def undo_messages():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.messages RESTART IDENTITY CASCADE;")  # <--- this has been updated for: truncate messages table in production
    else:
        db.session.execute(text("DELETE FROM messages"))  # <--- this has been updated for: delete all messages in non-production
    db.session.commit()
