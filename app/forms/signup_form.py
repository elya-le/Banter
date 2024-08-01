# /var/www/app/forms/signup_form.py
import re
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField
from wtforms.validators import DataRequired, ValidationError, Length, EqualTo
from app.models import User

def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')

def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')

def validate_email(form, field):
    # Custom email validation
    email = field.data
    email_regex = r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$'
    if not re.match(email_regex, email):
        raise ValidationError("Invalid email address")

class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), Length(min=6, message="Username must be at least 6 characters"), username_exists])
    email = StringField('email', validators=[DataRequired(), validate_email, user_exists])
    password = PasswordField('password', validators=[DataRequired(), EqualTo('confirm_password', message="Passwords must match")])
    confirm_password = PasswordField('confirm_password', validators=[DataRequired()])
