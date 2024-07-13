from app.models import db, Server, environment, SCHEMA
from sqlalchemy.sql import text

def seed_servers():
    servers = [
        Server(
            name='Midjourney',
            description='The official server for Midjourney, a text-to-image AI where your imagination is the only limit.',
            avatar_url='midjourney_avatar_url',
            banner_url='midjourney_banner_url',
            category='Gaming',
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
            name='Honkai: Star Rail Official',
            description='Honkai: Star Rail is a space fantasy RPG by HoYoverse. Hop aboard the Astral Express and explore the galaxy&apos;s wonders!',
            avatar_url='honkai_avatar_url',
            banner_url='honkai_banner_url',
            category='Gaming',
            creator_id=1
        ),
        Server(
            name='VALORANT',
            description='The official VALORANT Discord server, in collaboration with Riot Games. Find the latest news and talk about the game!',
            avatar_url='valorant_avatar_url',
            banner_url='valorant_banner_url',
            category='Gaming',
            creator_id=1
        ),
        Server(
            name='MINECRAFT',
            description='The official Minecraft Discord!',
            avatar_url='minecraft_avatar_url',
            banner_url='minecraft_banner_url',
            category='Gaming',
            creator_id=1
        ),
        Server(
            name='Official Fortnite',
            description='The Official Fortnite Discord Server! Join to follow news channels, LFG, and chat.',
            avatar_url='fortnite_avatar_url',
            banner_url='fortnite_banner_url',
            category='Gaming',
            creator_id=1
        ),
        Server(
            name='Deep Rock Galactic',
            description='Official Server for Deep Rock Galactic - a game about dwarven team spirit, mining, and shooting aliens.',
            avatar_url='deeprock_avatar_url',
            banner_url='deeprock_banner_url',
            category='Gaming',
            creator_id=1
        ),
        Server(
            name='Destiny 2 LFG',
            description='Destiny 2 LFG Server for All Platforms, Console and PC.',
            avatar_url='destiny_avatar_url',
            banner_url='destiny_banner_url',
            category='Gaming',
            creator_id=1
        ),
        Server(
            name='Roblox',
            description='The largest community-run Roblox server. Join for news, LFG, events & more! For both Players and Creators.',
            avatar_url='roblox_avatar_url',
            banner_url='roblox_banner_url',
            category='Gaming',
            creator_id=1
        ),
        Server(
            name='Apex Legends',
            description='Join our developer-supported Discord server dedicated to Apex Legends. Join for LFG, Game Discussion, News and more!',
            avatar_url='apex_avatar_url',
            banner_url='apex_banner_url',
            category='Gaming',
            creator_id=1
        ),
        Server(
            name='Terraria',
            description='Ask questions, join events, win prizes and meet new friends on the official Terraria server. The 1 rated game on Steam!',
            avatar_url='terraria_avatar_url',
            banner_url='terraria_banner_url',
            category='Gaming',
            creator_id=1
        ),
        Server(
            name='Rainbow 6',
            description='The Rainbow 6 Discord. Keep up with R6 game news, Siege esports, find teammates, and chat about all things Rainbow Six!',
            avatar_url='rainbow6_avatar_url',
            banner_url='rainbow6_banner_url',
            category='Gaming',
            creator_id=1
        ),
        Server(
            name='Phasmophobia',
            description='Official Discord. Phasmophobia is a 4 player co-op psychological horror game.',
            avatar_url='phasmophobia_avatar_url',
            banner_url='phasmophobia_banner_url',
            category='Gaming',
            creator_id=1
        ),
        Server(
            name='Once Human',
            description='The official Discord server of the game Once Human by Starry Studio. Find the latest news and discuss this game.',
            avatar_url='oncehuman_avatar_url',
            banner_url='oncehuman_banner_url',
            category='Gaming',
            creator_id=1
        ),
        Server(
            name='Wuthering Waves Official',
            description='The official Discord server for Wuthering Waves a story-rich open-world game by Kuro Games.',
            avatar_url='wutheringwaves_avatar_url',
            banner_url='wutheringwaves_banner_url',
            category='Gaming',
            creator_id=1
        ),
        Server(
            name='No Hesi',
            description='No Hesi, the largest Assetto Corsa racing and connect with drivers worldwide.',
            avatar_url='nohessi_avatar_url',
            banner_url='nohessi_banner_url',
            category='Gaming',
            creator_id=1
        ),
        Server(
            name='THE FINALS',
            description='Welcome, Contestant! Enter the Arena and join the official server for THE FINALS!',
            avatar_url='thefinals_avatar_url',
            banner_url='thefinals_banner_url',
            category='Gaming',
            creator_id=1
        ),
        Server(
            name='Escape from Tarkov Official',
            description='Official Escape from Tarkov Discord server.',
            avatar_url='tarkov_avatar_url',
            banner_url='tarkov_banner_url',
            category='Gaming',
            creator_id=1
        ),
        Server(
            name='Zenless Zone Zero Official',
            description='Official Discord. Zenless Zone Zero is a sub-Hollow disaster occurring… the district you are trying to protect.',
            avatar_url='zenless_avatar_url',
            banner_url='zenless_banner_url',
            category='Gaming',
            creator_id=1
        ),
        Server(
            name='Overwatch 2',
            description='Official Discord server - join us for gameplay discussion, LFG, Overwatch news and more!',
            avatar_url='overwatch_avatar_url',
            banner_url='overwatch_banner_url',
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
            name='Rythm',
            description='This is the home of Rythm. Here you can stay up to date on all the latest news on Rythm&apos;s relaunch and much more!',
            avatar_url='rythm_avatar_url',
            banner_url='rythm_banner_url',
            category='Music',
            creator_id=1
        ),
        Server(
            name='Groovy Community',
            description='Official place of the Groovy Discord bot. Join for events, giveaways, and a cool community.',
            avatar_url='groovy_avatar_url',
            banner_url='groovy_banner_url',
            category='Music',
            creator_id=1
        ),
        Server(
            name='Suno',
            description='Make any song you can imagine',
            avatar_url='suno_avatar_url',
            banner_url='suno_banner_url',
            category='Music',
            creator_id=1
        ),
        Server(
            name='Kenny Beats',
            description='The official Discord server for Kenny Beats and The Cave.',
            avatar_url='kenny_beats_avatar_url',
            banner_url='kenny_beats_banner_url',
            category='Music',
            creator_id=1
        ),
        Server(
            name='BLACKPINK | LISA •ROCKS•',
            description='The official fan server dedicated to BLACKPINK! Join to stay up to date and chat with fellow BLINKS!',
            avatar_url='blackpink_avatar_url',
            banner_url='blackpink_banner_url',
            category='Music',
            creator_id=1
        ),
        Server(
            name='Ken Carson',
            description='The official Ken Carson Discord server.',
            avatar_url='ken_carson_avatar_url',
            banner_url='ken_carson_banner_url',
            category='Music',
            creator_id=1
        ),
        Server(
            name='Karaoke Lounge - Singing 🎤',
            description='Sing it&apos;s what we do, all day, every day, come and jam with us! just enjoy, no judging, good vibes only!',
            avatar_url='karaoke_lounge_avatar_url',
            banner_url='karaoke_lounge_banner_url',
            category='Music',
            creator_id=1
        ),
        Server(
            name='Stray Kids | 0179',
            description='The official Discord server for r/StrayKids, a community for the K-pop boy group Stray Kids. Come and stay with us!',
            avatar_url='stray_kids_avatar_url',
            banner_url='stray_kids_banner_url',
            category='Music',
            creator_id=1
        ),
        Server(
            name='NewJeans (뉴진스) | Superfans',
            description='A Discord server dedicated to ADOR&apos;s girl group, NewJeans! Feel free to join us!',
            avatar_url='newjeans_avatar_url',
            banner_url='newjeans_banner_url',
            category='Music',
            creator_id=1
        ),
        Server(
            name='r/TaylorSwift',
            description='A welcoming community for Taylor Swift fans. Come join us!',
            avatar_url='taylor_swift_avatar_url',
            banner_url='taylor_swift_banner_url',
            category='Music',
            creator_id=1
        ),
        Server(
            name='twenty one pilots',
            description='The official twenty one pilots discord server. <{•.•}>',
            avatar_url='twenty_one_pilots_avatar_url',
            banner_url='twenty_one_pilots_banner_url',
            category='Music',
            creator_id=1
        ),
        Server(
            name='Avenged Sevenfold',
            description='The Official Avenged Sevenfold Discord.',
            avatar_url='avenged_sevenfold_avatar_url',
            banner_url='avenged_sevenfold_banner_url',
            category='Music',
            creator_id=1
        ),
        Server(
            name='World Of Walker',
            description='The Official Alan Walker Server. Let&apos;s unite Walkers!',
            avatar_url='world_of_walker_avatar_url',
            banner_url='world_of_walker_banner_url',
            category='Music',
            creator_id=1
        ),
        Server(
            name='baby no server',
            description='Welcome to the official Discord server for rapper, singer, and songwriter baby no money. **New Single i&apos;ll freak out now!**',
            avatar_url='baby_no_server_avatar_url',
            banner_url='baby_no_server_banner_url',
            category='Music',
            creator_id=1
        ),
        Server(
            name='ITZY | Welcome Home LIA!',
            description='The discord server for kpop girl group ITZY! Come join fellow MIDZYs and keep updated on everything ITZY!',
            avatar_url='itzy_avatar_url',
            banner_url='itzy_banner_url',
            category='Music',
            creator_id=1
        ),
        Server(
            name='aespa',
            description='Welcome to the fan server for the k-pop group aespa!',
            avatar_url='aespa_avatar_url',
            banner_url='aespa_banner_url',
            category='Music',
            creator_id=1
        ),
        Server(
            name='Müzisyenler',
            description='Bu bol müzik yaptığımız, sohbetler edip oyunlar oynadığımız bir ortam. Sanatını icra etmek için de sen katıl!',
            avatar_url='muzisyenler_avatar_url',
            banner_url='muzisyenler_banner_url',
            category='Music',
            creator_id=1
        ),
        Server(
            name='stats.fm',
            description='The official server for stats.fm. You can verify to get live data about the app. Keep connected and just chill.',
            avatar_url='stats_fm_avatar_url',
            banner_url='stats_fm_banner_url',
            category='Music',
            creator_id=1
        ),
        Server(
            name='Monstercat',
            description='Electronic record label empowering a creative and passionate community through innovation. Welcome to the family!',
            avatar_url='monstercat_avatar_url',
            banner_url='monstercat_banner_url',
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
        ),
        Server(
            name='Study Together',
            description='The largest study and productivity server on Discord! Study live-time with others via camera, screenshare or chat',
            avatar_url='study_together_avatar_url',
            banner_url='study_together_banner_url',
            category='Education',
            creator_id=1
        ),
        Server(
            name='Mathematics',
            description='A place for people to learn and discuss mathematics.',
            avatar_url='mathematics_avatar_url',
            banner_url='mathematics_banner_url',
            category='Education',
            creator_id=1
        ),
        Server(
            name='Game Dev League',
            description='Game Dev League is a community server built by Game Developers, For Game Developers!',
            avatar_url='game_dev_league_avatar_url',
            banner_url='game_dev_league_banner_url',
            category='Education',
            creator_id=1
        ),
        Server(
            name='Language Sloth',
            description='The official discord server for the Language Sloth community on Discord! Learn languages and speak in the voice chat!',
            avatar_url='language_sloth_avatar_url',
            banner_url='language_sloth_banner_url',
            category='Education',
            creator_id=1
        ),
        Server(
            name='Spanish-English Learning Server',
            description='Learn Spanish and English in the most fun way ever! - ¡Aprende español e inglés de la forma más divertida!',
            avatar_url='spanish_english_learning_avatar_url',
            banner_url='spanish_english_learning_banner_url',
            category='Education',
            creator_id=1
        ),
        Server(
            name='Gohar\'s Guide',
            description='Whether you need help finishing your homework or applying to college, you\'ve found the right community!',
            avatar_url='gohars_guide_avatar_url',
            banner_url='gohars_guide_banner_url',
            category='Education',
            creator_id=1
        ),
        Server(
            name='The English Hub',
            description='A world of eclectic English learning. Improve your English Speaking Skills using our English Classes and Voice Channels.',
            avatar_url='the_english_hub_avatar_url',
            banner_url='the_english_hub_banner_url',
            category='Education',
            creator_id=1
        ),
        Server(
            name='German Learning and Discussion',
            description='A community-driven server for learning German with native speakers, lessons for everyone and many useful resources!',
            avatar_url='german_learning_avatar_url',
            banner_url='german_learning_banner_url',
            category='Education',
            creator_id=1
        ),
        Server(
            name='Programadores y Estudiantes',
            description='Comunidad que abarca todos los lenguajes de programación. Encuentra desde profesores hasta nuevos programadores.',
            avatar_url='programadores_avatar_url',
            banner_url='programadores_banner_url',
            category='Education',
            creator_id=1
        ),
        Server(
            name='ELGATO',
            description='Official Elgato Discord for content creators, YouTubers, and more! Get connected and learn more about Elgato products.',
            avatar_url='elgato_avatar_url',
            banner_url='elgato_banner_url',
            category='Education',
            creator_id=1
        ),
        Server(
            name='OffSec',
            description='The OffSec Discord allows members to learn, share, and to connect with others from OffSec Community.',
            avatar_url='offsec_avatar_url',
            banner_url='offsec_banner_url',
            category='Education',
            creator_id=1
        ),
        Server(
            name='OverSimplified',
            description='The official Discord server for the OverSimplified YouTube channel. Come join our community!',
            avatar_url='oversimplified_avatar_url',
            banner_url='oversimplified_banner_url',
            category='Education',
            creator_id=1
        ),
        Server(
            name='French - Learn French in a fun way',
            description='We are a friendly French learning community! On reste une communauté d&apos;apprentissage du français',
            avatar_url='french_learning_avatar_url',
            banner_url='french_learning_banner_url',
            category='Education',
            creator_id=1
        ),
        Server(
            name='Japanese Academy',
            description='We are a tight-knit community where you can receive guidance, assistance, and support in your Japanese learning journey.',
            avatar_url='japanese_academy_avatar_url',
            banner_url='japanese_academy_banner_url',
            category='Education',
            creator_id=1
        ),
        Server(
            name='AP Students',
            description='A server where AP students can seek help and chat with other students.',
            avatar_url='ap_students_avatar_url',
            banner_url='ap_students_banner_url',
            category='Education',
            creator_id=1
        ),
        Server(
            name='Learn w/ Leon & Friends',
            description='We are engineers who believe in community before code & provide a 100 percent free path to becoming a software engineer!',
            avatar_url='learn_with_leon_avatar_url',
            banner_url='learn_with_leon_banner_url',
            category='Education',
            creator_id=1
        ),
        Server(
            name='MKBHD',
            description='We&apos;re the official community of the Marques Brownlee YouTube channel!',
            avatar_url='mkbhd_avatar_url',
            banner_url='mkbhd_banner_url',
            category='Education',
            creator_id=1
        ),
        Server(
            name='Design Buddies',
            description='Meet other designers, level up your design skills, land jobs, and more!',
            avatar_url='design_buddies_avatar_url',
            banner_url='design_buddies_banner_url',
            category='Education',
            creator_id=1
        ),
        Server(
            name='Chess Academy',
            description='A friendly community to learn, chat, and play your favorite tabletop game - Chess! Lectures, feedback, and advice!',
            avatar_url='chess_academy_avatar_url',
            banner_url='chess_academy_banner_url',
            category='Education',
            creator_id=1
        )
        # Server(
        #     name='App Academy Instruction: Online Programs', 
        #     description='Class server', 
        #     creator_id=1,
        #     avatar_url='url-to-avatar1'
        # ),
        # Server(
        #     name='Refactor Retreat', 
        #     description='The road to greenlit does not have to be lonely. Hang out, code review, and refactor in the company of other classmates.', 
        #     creator_id=1,
        #     avatar_url='url-to-avatar1'
        # ),
        # Server(
        #     name='Post-grad Pad', 
        #     description='For App Academy alumni - a laid-back yet professional environment where graduates can network, collaborate on projects, and enjoy the camaraderie of their classmates they have seen every day for the better part of this year.', 
        #     creator_id=1,
        #     avatar_url='url-to-avatar1'
        # ),
        # Server(
        #     name='Mini Motorways - Gridlock Gang', 
        #     description='Dedicated to fans of the Mini Motorways game. Whether you are a seasoned urban planner or a new player discovering the joys of managing traffic, this is the place for you. Share your city layouts, discuss strategies, and participate in friendly competitions.', 
        #     creator_id=1,
        #     avatar_url='url-to-avatar1'
        # )
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
