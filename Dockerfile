# use the specified base image
FROM python:3.9.18-alpine3.18

# install necessary packages
RUN apk add build-base
RUN apk add postgresql-dev gcc python3-dev musl-dev

# define build arguments
ARG FLASK_APP
ARG FLASK_ENV
ARG DATABASE_URL
ARG SCHEMA
ARG SECRET_KEY
ARG AWS_ACCESS_KEY_ID
ARG AWS_SECRET_ACCESS_KEY
ARG AWS_BUCKET_NAME
ARG AWS_REGION

# set the working directory
WORKDIR /var/www

# copy and install Python dependencies
COPY requirements.txt .
RUN pip install --upgrade pip  # Upgrade pip to the latest version
RUN pip install -r requirements.txt
RUN pip install psycopg2

# copy the rest of the application code
COPY . .

# run database migrations and seed the database
RUN flask db upgrade
RUN flask seed undo
RUN flask seed all

# define the command to run the application using Gunicorn with Eventlet workers this has been updated to use eventlet for WebSocket support
CMD gunicorn --worker-class eventlet -w 1 app:app  