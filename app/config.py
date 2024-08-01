import os
import logging
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY')
    FLASK_RUN_PORT = os.environ.get('FLASK_RUN_PORT')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    # Check if DATABASE_URL is set
    database_url = os.environ.get('DATABASE_URL')
    if database_url:
        # Replace 'postgres://' with 'postgresql://' if needed
        if database_url.startswith('postgres://'):
            database_url = database_url.replace('postgres://', 'postgresql://')
        SQLALCHEMY_DATABASE_URI = database_url
    else:
        raise ValueError("No DATABASE_URL set for Flask application")
    
    SQLALCHEMY_ECHO = False

# Add logging to capture the database URL
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)
logger.debug(f"DATABASE_URL: {os.environ.get('DATABASE_URL')}")


# import os
# from dotenv import load_dotenv

# # Load environment variables from .env file
# load_dotenv()

# class Config:
#     SECRET_KEY = os.environ.get('SECRET_KEY')
#     FLASK_RUN_PORT = os.environ.get('FLASK_RUN_PORT')
#     SQLALCHEMY_TRACK_MODIFICATIONS = False
#     # Check if DATABASE_URL is set
#     database_url = os.environ.get('DATABASE_URL')
#     if database_url:
#         # Replace 'postgres://' with 'postgresql://' if needed
#         if database_url.startswith('postgres://'):
#             database_url = database_url.replace('postgres://', 'postgresql://')
#         SQLALCHEMY_DATABASE_URI = database_url
#     else:
#         raise ValueError("No DATABASE_URL set for Flask application")
#     SQLALCHEMY_ECHO = False


# import os


# class Config:
#     SECRET_KEY = os.environ.get('SECRET_KEY')
#     FLASK_RUN_PORT = os.environ.get('FLASK_RUN_PORT')
#     SQLALCHEMY_TRACK_MODIFICATIONS = False
#     # SQLAlchemy 1.4 no longer supports url strings that start with 'postgres'
#     # (only 'postgresql') but heroku's postgres add-on automatically sets the
#     # url in the hidden config vars to start with postgres.
#     # so the connection uri must be updated here (for production)
#     SQLALCHEMY_DATABASE_URI = os.environ.get(
#         'DATABASE_URL').replace('postgres://', 'postgresql://')
#     SQLALCHEMY_ECHO = False
