from app.models import db, environment, SCHEMA
from sqlalchemy.sql import text

def seed_messages():
    try:
        if environment == "production":
            db.session.execute(f"TRUNCATE table {SCHEMA}.messages RESTART IDENTITY CASCADE;")
        else:
            db.session.execute(text("DELETE FROM messages"))
        db.session.commit()

        # no need to add any new messages
        print("Messages table truncated and no new messages seeded.")

    except Exception as e:
        db.session.rollback()
        print(f"Error seeding messages: {e}")

def undo_messages():
    try:
        if environment == "production":
            db.session.execute(f"TRUNCATE table {SCHEMA}.messages RESTART IDENTITY CASCADE;")
        else:
            db.session.execute(text("DELETE FROM messages"))
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        print(f"Error undoing messages: {e}")
