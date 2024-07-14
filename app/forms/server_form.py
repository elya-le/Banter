from flask_wtf import FlaskForm
from wtforms import StringField, HiddenField
from wtforms.validators import DataRequired
# from flask_wtf.file import FileAllowed

# class ServerForm(FlaskForm):
#     name = StringField('name', validators=[DataRequired(), Length(min=1, max=100)])
#     description = StringField('description', validators=[Length(max=255)])
#     avatar = FileField('avatar', validators=[FileAllowed(['jpg', 'png', 'jpeg'])])
#     banner = FileField('banner', validators=[FileAllowed(['jpg', 'png', 'jpeg'])])
#     category = StringField('category', validators=[Length(max=50)])

class ServerForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    description = StringField('description', validators=[DataRequired()])
    avatar_url = StringField('avatar_url')
    banner_url = StringField('banner_url')
    category = StringField('category')
    csrf_token = HiddenField()
