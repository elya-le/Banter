from flask_wtf import FlaskForm
from wtforms import StringField, FileField
from wtforms.validators import DataRequired, Length, URL

class ServerForm(FlaskForm):
    name = StringField('name', validators=[DataRequired(), Length(min=1, max=100)])
    description = StringField('description', validators=[Length(max=255)])
    avatar = FileField('avatar')
    banner = FileField('banner')
    category = StringField('category', validators=[Length(max=50)])
