from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Length, URL

class ServerForm(FlaskForm):
    name = StringField('name', validators=[DataRequired(), Length(min=1, max=100)])
    description = StringField('description', validators=[Length(max=255)])
    avatar_url = StringField('avatar_url', validators=[URL(), Length(max=255)])  

