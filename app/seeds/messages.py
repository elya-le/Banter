from app.models import db, Message, Channel, User, environment, SCHEMA
from sqlalchemy.sql import text

def seed_messages():
    try:
        if environment == "production":
            db.session.execute(f"TRUNCATE table {SCHEMA}.messages RESTART IDENTITY CASCADE;")
        else:
            db.session.execute(text("TRUNCATE table messages RESTART IDENTITY CASCADE;"))
        db.session.commit()

        channels = Channel.query.all()
        users = User.query.all()  # Ensure users are seeded first

        if not users:
            raise ValueError("Users must be seeded before seeding messages.")

        messages = [
            Message(user_id=users[0].id, channel_id=channel.id, content='Hello, everyone!') for channel in channels
        ] + [
            Message(user_id=users[1].id, channel_id=channel.id, content='Welcome to the channel!') for channel in channels
        ]

        db.session.bulk_save_objects(messages)
        db.session.commit()

    except Exception as e:
        db.session.rollback()
        print(f"Error seeding messages: {e}")

def undo_messages():
    try:
        if environment == "production":
            db.session.execute(f"TRUNCATE table {SCHEMA}.messages RESTART IDENTITY CASCADE;")
        else:
            db.session.execute(text("TRUNCATE table messages RESTART IDENTITY CASCADE;"))
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        print(f"Error undoing messages: {e}")
