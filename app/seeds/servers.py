from app.models import db, Server, User, environment, SCHEMA
from sqlalchemy.sql import text

def seed_servers():
    print("Seeding servers...")

    # clear out existing servers before seeding
    print("Deleting existing servers...")  # -------------- delete print before deploy

    db.session.execute(text("DELETE FROM user_server_membership"))  # clear user-server memberships first
    db.session.execute(text("DELETE FROM servers"))  # then clear servers
    db.session.commit()
    print("Existing servers deleted")  # -------------- delete print before deploy


    servers = [
        Server(
            name='Midjourney',
            description='The official server for Midjourney, a text-to-image AI where your imagination is the only limit.',
            avatar_url='midjourney_avatar_url',
            banner_url='midjourney_banner_url',
            category='Art',
            creator_id=1
        ),
        Server(
            name='Genshin Impact Official',
            description='Welcome to Teyvat, Traveler! This is the place to discuss with others about your favorite game: Genshin Impact!',
            avatar_url='genshin_avatar_url',
            banner_url='genshin_banner_url',
            category='Gaming',
            creator_id=1
        ),
        Server(
            name='Lofi Girl',
            description='The friendliest community on Discord. Join now to meet amazing people from all around the world',
            avatar_url='lofi_girl_avatar_url',
            banner_url='lofi_girl_banner_url',
            category='Music',
            creator_id=1
        ),
        Server(
            name='Voltaic',
            description='Voltaic is an educational community with a focus on improvement. Aim Training and FPS Talent (Valorant, Apex and more).',
            avatar_url='voltaic_avatar_url',
            banner_url='voltaic_banner_url',
            category='Education',
            creator_id=1
        )
    ]

    db.session.bulk_save_objects(servers)
    db.session.commit()
    print("Servers seeded")    # -------------- delete print before deploy

    user = User.query.get(1)
    categories = set()

    for server in servers:
        if server.category not in categories:
            user.joined_servers.append(server)
            categories.add(server.category)

    db.session.commit()
    print("User joined servers")  # -------------- delete print before deploy


def undo_servers():
    print("Undoing servers...")
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.user_server_membership RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.servers RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM user_server_membership"))
        db.session.execute(text("DELETE FROM servers"))
    db.session.commit()
    print("Servers undon")  # -------------- delete print before deploy

