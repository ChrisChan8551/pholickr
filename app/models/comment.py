
from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class Comment(db.Model):
    __tablename__ = 'comments'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    photoId = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('photos.id')), nullable=False)
    userId = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('users.id')), nullable=False)
    text = db.Column(db.String(255), nullable=False)

    photos = db.relationship('Photo', back_populates='comments')
    user = db.relationship('User', back_populates='comments')

    def __repr__(self):
        return f'<Comment id:{self.id}, photoId:{self.photoId}, userId:{self.userId}, text:{self.text}>'

    def to_dict(self):
        return {
            'id': self.id,
            'photoId': self.photoId,
            'userId': self.userId,
            'text': self.text,
        }
