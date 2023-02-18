from flask import Blueprint, jsonify, render_template, redirect, request
from flask_sqlalchemy import SQLAlchemy
from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from flask_login import login_required, current_user
from app.models import Album, Photo, db

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
# @login_required
def get_album(id):
    # print("************GET 1 ALBUM********************")
    album = Album.query.get(id)
    return album.to_dict()


@album_routes.route('/<int:id>', methods=['DELETE'])
# @login_required
def delete_album(id):
    album = Album.query.get(id)
    db.session.delete(album)
    db.session.commit()
    return "sucessfully deleted Album"
