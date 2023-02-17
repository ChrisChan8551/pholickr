from flask import Blueprint, jsonify, render_template, redirect, request
from flask_login import login_required, current_user
from app.models import Photo, db

photo_routes = Blueprint('photos', __name__)

def validation_errors_to_error_messages(validation_errors):

    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@photo_routes.route('/', methods=['GET'])
# @login_required
def get_all_photos():
    photos = Photo.query.all()
    print('********GET ALL PHOTOS********')
    return {'photos': [photo.to_dict() for photo in photos]}

@photo_routes.route('/<int:id>')
# @login_required
def get_photo(id):
    print('************GET 1 PHOTO********************')
    photo = Photo.query.get(id)
    return photo.to_dict()

@photo_routes.route('/<int:id>', methods=['DELETE'])
# @login_required
def delete_photo(id):
    photo = Photo.query.get(id)
    db.session.delete(photo)
    db.session.commit()
    return "Successfully Deleted Photo"
