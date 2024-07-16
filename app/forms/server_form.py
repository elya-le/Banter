from flask_wtf import FlaskForm
from wtforms import StringField, HiddenField, FileField
from wtforms.validators import DataRequired, Length
from flask_wtf.file import FileAllowed

class ServerForm(FlaskForm):
    name = StringField('name', validators=[DataRequired(), Length(min=1, max=100)])
    description = StringField('description', validators=[Length(max=255)])
    avatar = FileField('avatar', validators=[FileAllowed(['jpg', 'png', 'jpeg'])])
    banner = FileField('banner', validators=[FileAllowed(['jpg', 'png', 'jpeg'])])
    category = StringField('category')
    csrf_token = HiddenField()




