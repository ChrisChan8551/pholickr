from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash


faves = db.Table(
    'faves',
    db.Model.metadata,
    db.Column('userId', db.Integer, db.ForeignKey(
        add_prefix_for_prod('users.id')), primary_key=True),
    db.Column('photoId', db.Integer, db.ForeignKey(
        add_prefix_for_prod('photos.id')), primary_key=True),
    schema=SCHEMA
)


class Photo(db.Model):
    __tablename__ = 'photos'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('users.id')), nullable=False)
    title = db.Column(db.String(255))
    description = db.Column(db.String(100))
    imageUrl = db.Column(db.String(1500))

    user = db.relationship('User', back_populates='photos')
    comments = db.relationship(
        'Comment', back_populates='photos', cascade='all, delete')
    faved_by = db.relationship(
        'User', secondary=faves, back_populates='faves', cascade='all, delete')

    def __repr__(self):
        return f'<Photo Id: {self.id}, userId: {self.userId}, title: {self.title}, description: {self.description}, imageUrl: {self.imageUrl}>'

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'title': self.title,
            'description': self.description,
            'imageUrl': self.imageUrl,
        }
