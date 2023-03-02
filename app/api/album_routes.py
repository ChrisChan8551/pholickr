from flask import Blueprint, jsonify, render_template, redirect, request
from flask_sqlalchemy import SQLAlchemy
from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from flask_login import login_required, current_user
from app.models import Album, Photo, db
from app.forms import AlbumForm

album_routes = Blueprint('albums', __name__)


def validation_errors_to_error_messages(validation_errors):

    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@album_routes.route('/', methods=['GET'])
# @login_required
def get_all_albums():
    albums = Album.query.all()
    # print("**************** GET ALL ALBUMS ****************")
    # print(albums)
    return jsonify ([album.to_dict() for album in albums])


@album_routes.route('/<int:id>')
@login_required
def get_album(id):
    # print("************GET 1 ALBUM********************")
    album = Album.query.get(id)
    return album.to_dict()


@album_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_album(id):
    album = Album.query.get(id)
    db.session.delete(album)
    db.session.commit()
    return "sucessfully deleted Album"

@album_routes.route('/', methods=['GET', 'POST'])
@login_required
def create_album():
    # print("************CREATE NEW ALBUM********************")
    form = AlbumForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        new_album = Album(userId=current_user.get_id())
                        #   title=data['title'],
                        #   imageUrl=data['imageUrl'])
        for key, value in data.items():
            setattr(new_album, key, value)
        form.populate_obj(new_album)
        # print('*********************CREATED*******************************')
        # print(new_album)
        db.session.add(new_album)
        db.session.commit()
        return new_album.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400

@album_routes.route('/<int:id>', methods=["PATCH", "PUT"])
@login_required
def edit_album(id):
    # data = request.json
    # print('*********************EDIT ALBUM*******************************')
    # print(data)

    # album = album.query.get(id)
    # print(album)
    # for key, value in data.items():
    #     setattr(album, key, value)
    # db.session.commit()
    # print('*********************UPDATED ALBUM*******************************')
    form = AlbumForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # print('*********************EDIT ALBUM*******************************')
        data = form.data
        album = Album.query.get(id)
        # print(album)
        for key, value in data.items():
            setattr(album, key, value)
        # album.title = data['title']
        # album.url = data['url']
        # album.imageUrl = data['imageUrl']
        # print('*********************UPDATED ALBUM*******************************')
        db.session.commit()
        return album.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400

@album_routes.route('/<int:album_id>/photo/<int:photo_id>', methods=["POST"])
@login_required
def add_pinning(album_id, photo_id):
    photo = Photo.query.get(photo_id)
    album = Album.query.get(album_id)

    if album.userId != current_user.id:
        return {'errors': ['Unauthorized']}, 403

    album.photos.append(photo)

    db.session.commit()
    return album.to_dict()

@album_routes.route('/<int:album_id>/photo/<int:photo_id>', methods=['DELETE'])
@login_required
def remove_pinning(album_id, photo_id):
    album = Album.query.get(album_id)

    if album.userId != current_user.id:
        return {'errors': ['Unauthorized']}, 403

    for photo in album.photos:
        if photo.id == photo_id:
            album.photos.remove(photo)

    db.session.commit()
    return album.to_dict()
