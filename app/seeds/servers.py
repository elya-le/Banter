from app.models import db, Server, User, environment, SCHEMA
from sqlalchemy.sql import text

def seed_servers():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.user_server_membership RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.servers RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM user_server_membership"))
        db.session.execute(text("DELETE FROM servers"))
    db.session.commit()

    servers = [
        Server(
            name="Roast My Resume",
            description="Submit your resume and let our experts roast it with sharp, honest feedback.",
            avatar_url="https://portfolio-elya.s3.us-east-2.amazonaws.com/banter-server-seeders/Roast-My-Resume-a.jpg",
            banner_url="https://portfolio-elya.s3.us-east-2.amazonaws.com/banter-server-seeders/Roast-My-Resume-b.jpg",
            category="Humor",
            creator_id=1,
        ),
        Server(
            name="Post-grad Pad",
            description="For App Academy alumni to network and collaborate.",
            avatar_url="https://portfolio-elya.s3.us-east-2.amazonaws.com/banter-server-seeders/Post-Grad-Pad-a.jpeg",
            banner_url="https://portfolio-elya.s3.us-east-2.amazonaws.com/banter-server-seeders/Post-Grad-Pad-b.jpeg",
            category="Networking",
            creator_id=1,
        ),
        Server(
            name="Midjourney",
            description="The official server for Midjourney, a text-to-image AI.",
            avatar_url="https://portfolio-elya.s3.us-east-2.amazonaws.com/banter-server-seeders/Midjourney-a.jpg",
            banner_url="https://portfolio-elya.s3.us-east-2.amazonaws.com/banter-server-seeders/Midjourney-b.jpg",
            category="Art",
            creator_id=1
        ),
        Server(
            name="TryHackMe",
            description="A place to ask questions and grow your cybersecurity skills.",
            avatar_url="https://portfolio-elya.s3.us-east-2.amazonaws.com/banter-server-seeders/TryHackMe-a.jpg",
            banner_url="https://portfolio-elya.s3.us-east-2.amazonaws.com/banter-server-seeders/TryHackMe-b.jpg",
            category="Education",
            creator_id=1
        ),
        Server(
            name="Lofi Girl",
            description="Join to meet amazing people from all around the world.",
            avatar_url="https://portfolio-elya.s3.us-east-2.amazonaws.com/banter-server-seeders/Lofi-Girl-a.jpg",
            banner_url="https://portfolio-elya.s3.us-east-2.amazonaws.com/banter-server-seeders/Lofi-Girl-b.jpg",
            category="Music",
            creator_id=1
        ),
        Server(
            name="Pixel Cave",
            description="Connect with like-minded individuals who share your interests.",
            avatar_url="https://portfolio-elya.s3.us-east-2.amazonaws.com/banter-server-seeders/Pixel-Cave-a.jpg",
            banner_url="https://portfolio-elya.s3.us-east-2.amazonaws.com/banter-server-seeders/Pixel-Cave-b.jpg",
            category="Art",
            creator_id=1
        ),
        Server(
            name="App Academy Instruction: Online Programs",
            description="Class server",
            avatar_url="https://portfolio-elya.s3.us-east-2.amazonaws.com/banter-server-seeders/App-Academy-a.jpeg",
            banner_url="https://portfolio-elya.s3.us-east-2.amazonaws.com/banter-server-seeders/App-Academy-b.png",
            category="Education",
            creator_id=1,
        ),
        Server(
            name="Design Buddies",
            description="Meet other designers and level up your design skills.",
            avatar_url="https://portfolio-elya.s3.us-east-2.amazonaws.com/banter-server-seeders/Design-Buddies-a.png",
            banner_url="https://portfolio-elya.s3.us-east-2.amazonaws.com/banter-server-seeders/Design-Buddies-b.png",
            category="Education",
            creator_id=1
        ),
        Server(
            name="Genshin Impact Official",
            description="Welcome to Teyvat, Traveler! Discuss your favorite game: Genshin Impact!",
            avatar_url="https://portfolio-elya.s3.us-east-2.amazonaws.com/banter-server-seeders/Genshin-Impact-Official-a.jpg",
            banner_url="https://portfolio-elya.s3.us-east-2.amazonaws.com/banter-server-seeders/Genshin-Impact-Official-b.jpg",
            category="Gaming",
            creator_id=1
        ),
        Server(
            name="Language Sloth",
            description="Learn languages and speak in the voice chat!",
            avatar_url="https://portfolio-elya.s3.us-east-2.amazonaws.com/banter-server-seeders/Language-Sloth-a.jpg",
            banner_url="https://portfolio-elya.s3.us-east-2.amazonaws.com/banter-server-seeders/Language-Sloth-b.jpg",
            category="Education",
            creator_id=1
        ),
        Server(
            name="Chess.com",
            description="Satisfy all of your Chess needs with fellow Chess fans.",
            avatar_url="https://portfolio-elya.s3.us-east-2.amazonaws.com/banter-server-seeders/Chess-a.jpg",
            banner_url="https://portfolio-elya.s3.us-east-2.amazonaws.com/banter-server-seeders/Chess-b.jpg",
            category="Gaming",
            creator_id=1
        ),
        Server(
            name="Mini Motorways - Gridlock Gang",
            description="Share your city layouts, discuss strategies, and participate in friendly competitions.",
            avatar_url="https://portfolio-elya.s3.us-east-2.amazonaws.com/banter-server-seeders/Mini-Motorways-a.webp",
            banner_url="https://portfolio-elya.s3.us-east-2.amazonaws.com/banter-server-seeders/Mini-Motorways-b.avif",
            category="Gaming",
            creator_id=1,
        ),
        Server(
            name="Learn w/ Leon & Friends",
            description="We provide a 100 percent free path to becoming a software engineer!",
            avatar_url="https://portfolio-elya.s3.us-east-2.amazonaws.com/banter-server-seeders/Learn-with-Leon-a.jpg",
            banner_url="https://portfolio-elya.s3.us-east-2.amazonaws.com/banter-server-seeders/Learn-with-Leon-b.jpg",
            category="Education",
            creator_id=1
        ),
        Server(
            name="Refactor Retreat",
            description="The road to greenlit does not have to be lonely.",
            avatar_url="https://portfolio-elya.s3.us-east-2.amazonaws.com/banter-server-seeders/Refactor-Retreat-a.jpg",
            banner_url="https://portfolio-elya.s3.us-east-2.amazonaws.com/banter-server-seeders/Refactor-Retreat-b.webp",
            category="Education",
            creator_id=1,
        ),
        Server(
            name="Voltaic",
            description="Voltaic is an educational community with a focus on improvement.",
            avatar_url="https://portfolio-elya.s3.us-east-2.amazonaws.com/banter-server-seeders/Voltaic-a.jpg",
            banner_url="https://portfolio-elya.s3.us-east-2.amazonaws.com/banter-server-seeders/Voltaic-b.jpg",
            category="Education",
            creator_id=1
        )
    ]

    user = User.query.get(1)

    for server in servers:
        user.joined_servers.append(server)

    db.session.commit()

def undo_servers():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.user_server_membership RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.servers RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM user_server_membership"))
        db.session.execute(text("DELETE FROM servers"))
    db.session.commit()
