from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, HiddenField
from wtforms.validators import DataRequired, Length

class ChannelForm(FlaskForm):
    name = StringField('name', validators=[DataRequired(), Length(min=1, max=50)])
    server_id = IntegerField('server_id', validators=[DataRequired()])
    csrf_token = HiddenField()
