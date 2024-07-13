from app.models import db, Server, environment, SCHEMA
from sqlalchemy.sql import text

def seed_servers():
    servers = [
        Server(
            name='App Academy Instruction: Online Programs', 
            description='Class server', 
            creator_id=1
        ),
        Server(
            name='Refactor Retreat', 
            description='The road to greenlit does not have to be lonely. Hang out, code review, and refactor in the company of other classmates.', 
            creator_id=1
        ),
        Server(
            name='Post-grad Pad', 
            description='For App Academy alumni - a laid-back yet professional environment where graduates can network, collaborate on projects, and enjoy the camaraderie of their classmates they have seen every day for the better part of this year.', 
            creator_id=1
        ),
        Server(
            name='Mini Motorways - Gridlock Gang', 
            description='Dedicated to fans of the Mini Motorways game. Whether you are a seasoned urban planner or a new player discovering the joys of managing traffic, this is the place for you. Share your city layouts, discuss strategies, and participate in friendly competitions.', 
            creator_id=1
        ),
    ]

    for server in servers:
        db.session.add(server)

    db.session.commit()

def undo_servers():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.servers RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM servers"))
    db.session.commit()
