from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text

def seed_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))
    db.session.commit()

    demo = User(username='demo-user', email='demo@aa.io', password='password')
    brian = User(username='stovetop6893', email='brian@aa.io', password='password')
    brad = User(username='bradsimpson21378', email='brad@aa.io', password='password')
    keegan = User(username='kabley', email='keegan@aa.io', password='password')
    hui = User(username='sallywenwen', email='hui@aa.io', password='password')
    zac = User(username='gizelaman', email='zac@aa.io', password='password')
    tim = User(username='thecyberlocal', email='tim@aa.io', password='password')

    db.session.add_all([demo, brian, brad, keegan, hui, zac, tim])
    db.session.commit()

def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))
    db.session.commit()
