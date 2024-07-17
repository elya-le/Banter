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
            description="Submit your resume and let our experts roast it with sharp, honest feedback. We will point out the good, the bad, and the what were you thinking? moments.",
            avatar_url="https://portfolio-elya.s3.us-east-2.amazonaws.com/banter-server-seeders/Roast-My-Resume-a.jpg",
            banner_url="https://portfolio-elya.s3.us-east-2.amazonaws.com/banter-server-seeders/Roast-My-Resume-b.jpg",
            category="Humor",
            creator_id=1,
        ),
        Server(
            name="Refactor Retreat",
            description="The road to greenlit does not have to be lonely. Hang out, code review, and refactor in the company of other classmates.",
            avatar_url="https://portfolio-elya.s3.us-east-2.amazonaws.com/banter-server-seeders/Refactor-Retreat-a.jpg",
            banner_url="https://portfolio-elya.s3.us-east-2.amazonaws.com/banter-server-seeders/Refactor-Retreat-b.webp",
            category="Education",
            creator_id=1,
        ),
        Server(
            name="Post-grad Pad",
            description="For App Academy alumni - a laid-back yet professional environment where graduates can network, collaborate on projects, and enjoy the camaraderie of their classmates they have seen every day for the better part of this year.",
            avatar_url="https://portfolio-elya.s3.us-east-2.amazonaws.com/banter-server-seeders/Post-Grad-Pad-a.jpeg",
            banner_url="https://portfolio-elya.s3.us-east-2.amazonaws.com/banter-server-seeders/Post-Grad-Pad-b.jpg",
            category="Networking",
            creator_id=1,
        ),
        Server(
            name="Midjourney",
            description="The official server for Midjourney, a text-to-image AI where your imagination is the only limit.",
            avatar_url="https://portfolio-elya.s3.us-east-2.amazonaws.com/banter-server-seeders/Midjourney-a.jpg",
            banner_url="https://portfolio-elya.s3.us-east-2.amazonaws.com/banter-server-seeders/Midjourney-b.jpg",
            category="Art",
            creator_id=1
        ),
        Server(
            name="TryHackMe",
            description="If you're just getting started with our free platform or with cybersecurity in general, this is a place where you can ask questions, make new connections, and grow your mastery in a range of different learning pathways.",
            avatar_url="https://portfolio-elya.s3.us-east-2.amazonaws.com/banter-server-seeders/TryHackMe-a.jpg",
            banner_url="https://portfolio-elya.s3.us-east-2.amazonaws.com/banter-server-seeders/TryHackMe-b.jpg",
            category="Education",
            creator_id=1
        ),
        Server(
            name="Lofi Girl",
            description="The friendliest community on Discord. Join now to meet amazing people from all around the world",
            avatar_url="https://portfolio-elya.s3.us-east-2.amazonaws.com/banter-server-seeders/Lofi-Girl-a.jpg",
            banner_url="https://portfolio-elya.s3.us-east-2.amazonaws.com/banter-server-seeders/Lofi-Girl-b.jpg",
            category="Music",
            creator_id=1
        ),
        Server(
            name="Pixel Cave",
            description="Are you passionate about indie games, pixel art, or chiptune music? You've come to the best place. Join us and connect with like-minded individuals who share your interests and values.",
            avatar_url="https://portfolio-elya.s3.us-east-2.amazonaws.com/banter-server-seeders/Pixel-Cave-a.jpgl",
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
            description="Meet other designers, level up your design skills, land jobs, and more!",
            avatar_url="https://portfolio-elya.s3.us-east-2.amazonaws.com/banter-server-seeders/Design-Buddies-a.png",
            banner_url="https://portfolio-elya.s3.us-east-2.amazonaws.com/banter-server-seeders/Design-Buddies-b.png",
            category="Education",
            creator_id=1
        ),
        Server(
            name="Genshin Impact Official",
            description="Welcome to Teyvat, Traveler! This is the place to discuss with others about your favorite game: Genshin Impact!",
            avatar_url="https://portfolio-elya.s3.us-east-2.amazonaws.com/banter-server-seeders/Genshin-Impact-Official-a.jpg",
            banner_url="https://portfolio-elya.s3.us-east-2.amazonaws.com/banter-server-seeders/Genshin-Impact-Official-b.jpg",
            category="Gaming",
            creator_id=1
        ),
        Server(
            name="Language Sloth",
            description="The official discord server for the Language Sloth community on Discord! Learn languages and speak in the voice chat!",
            avatar_url="https://portfolio-elya.s3.us-east-2.amazonaws.com/banter-server-seeders/Language-Sloth-a.jpg",
            banner_url="https://portfolio-elya.s3.us-east-2.amazonaws.com/banter-server-seeders/Language-Sloth-b.jpg",
            category="Education",
            creator_id=1
        ),
        Server(
            name="Chess.com",
            description="The official Chess.com Discord server is there to satisfy all of your Chess needs! Connect with 30,000+ fellow Chess fans in various different ways, whether that's forums, chatting, calling, or watching each other's streams.",
            avatar_url="https://portfolio-elya.s3.us-east-2.amazonaws.com/banter-server-seeders/Chess-a.jpg",
            banner_url="https://portfolio-elya.s3.us-east-2.amazonaws.com/banter-server-seeders/Chess-b.jpg",
            category="Gaming",
            creator_id=1
        ),
        Server(
            name="Mini Motorways - Gridlock Gang",
            description="Dedicated to fans of the Mini Motorways game. Whether you are a seasoned urban planner or a new player discovering the joys of managing traffic, this is the place for you. Share your city layouts, discuss strategies, and participate in friendly competitions.",
            avatar_url="https://portfolio-elya.s3.us-east-2.amazonaws.com/banter-server-seeders/Mini-Motorways-a.webp",
            banner_url="https://portfolio-elya.s3.us-east-2.amazonaws.com/banter-server-seeders/Mini-Motorways-b.avif",
            category="Gaming",
            creator_id=1,
        ),
        Server(
            name="Learn w/ Leon & Friends",
            description="We are engineers who believe in community before code & provide a 100 percent free path to becoming a software engineer!",
            avatar_url="https://portfolio-elya.s3.us-east-2.amazonaws.com/banter-server-seeders/Learn-with-Leon-a.jpg",
            banner_url="https://portfolio-elya.s3.us-east-2.amazonaws.com/banter-server-seeders/Learn-with-Leon-b.jpg",
            category="Education",
            creator_id=1
        ),
        Server(
            name="Voltaic",
            description="Voltaic is an educational community with a focus on improvement. Aim Training and FPS Talent (Valorant, Apex and more).",
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
        db.session
