# /var/www/app/forms/login_form.py
import re
from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError
from app.models import User

def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if not user:
        raise ValidationError(' - Login or password is invalid')

def password_matches(form, field):
    # Checking if password matches
    password = field.data
    email = form.data['email']
    user = User.query.filter(User.email == email).first()
    if not user:
        raise ValidationError(' - Login or password is invalid')
    if not user.check_password(password):
        raise ValidationError(' - Login or password is invalid')

def validate_email(form, field):
    # Custom email validation
    email = field.data
    email_regex = r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$'
    if not re.match(email_regex, email):
        raise ValidationError("Invalid email address")

class LoginForm(FlaskForm):
    email = StringField('email', validators=[DataRequired(), validate_email, user_exists])
    password = StringField('password', validators=[DataRequired(), password_matches])
