from app.models import db, User, Server, user_server_membership, environment, SCHEMA
from sqlalchemy.sql import text

def seed_user_server_memberships():
    undo_user_server_memberships()

    memberships = [
        {'user_id': 1, 'server_id': 1},
        {'user_id': 1, 'server_id': 2},
        {'user_id': 1, 'server_id': 3},
        {'user_id': 1, 'server_id': 4},
        {'user_id': 2, 'server_id': 1},
        {'user_id': 2, 'server_id': 5},
        {'user_id': 2, 'server_id': 6},
        {'user_id': 3, 'server_id': 2},
        {'user_id': 3, 'server_id': 7},
        {'user_id': 3, 'server_id': 8},
        {'user_id': 4, 'server_id': 3},
        {'user_id': 4, 'server_id': 9},
        {'user_id': 4, 'server_id': 10},
        {'user_id': 5, 'server_id': 4},
        {'user_id': 5, 'server_id': 11},
        {'user_id': 5, 'server_id': 12},
        {'user_id': 6, 'server_id': 5},
        {'user_id': 6, 'server_id': 13},
        {'user_id': 6, 'server_id': 14},
        {'user_id': 7, 'server_id': 6},
        {'user_id': 7, 'server_id': 15},
        {'user_id': 7, 'server_id': 5},
    ]

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
