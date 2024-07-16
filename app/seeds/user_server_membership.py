from app.models import db, User, Server, user_server_membership, environment, SCHEMA
from sqlalchemy.sql import text

def seed_user_server_memberships():
    # Clear existing records
    undo_user_server_memberships()

    memberships = [
        {'user_id': 1, 'server_id': 1},
        {'user_id': 1, 'server_id': 2},
        {'user_id': 1, 'server_id': 3},
        {'user_id': 1, 'server_id': 4},
        # Add more memberships as needed
    ]

    # Insert memberships
    for membership in memberships:
        db.session.execute(
            text(f"INSERT INTO {SCHEMA}.user_server_membership (user_id, server_id) VALUES (:user_id, :server_id)")
            if environment == "production"
            else text("INSERT INTO user_server_membership (user_id, server_id) VALUES (:user_id, :server_id)"),
            membership
        )

    db.session.commit()

def undo_user_server_memberships():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.user_server_membership RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM user_server_membership"))
    db.session.commit()
