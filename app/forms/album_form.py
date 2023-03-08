from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField
from wtforms.validators import DataRequired, Email, ValidationError, URL


class AlbumForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired()])
    # description = StringField('description',validators=[DataRequired()])
    imageUrl = StringField('Image Url', validators=[DataRequired(), URL(
        message='This is not a valid image link, make sure you enter the entire image URL')])
