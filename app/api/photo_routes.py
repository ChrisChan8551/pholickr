from flask import Blueprint, jsonify, render_template, redirect, request
from flask_login import login_required, current_user
from app.models import Photo, Comment, db
from app.forms import PhotoForm, CommentForm


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
    # print('********GET ALL PHOTOS********')
    # print([photo.to_dict() for photo in photos])
    return jsonify([photo.to_dict() for photo in photos])


@photo_routes.route('/<int:id>')
@login_required
def get_photo(id):
    # print('************GET 1 PHOTO********************')
    photo = Photo.query.get(id)
    return photo.to_dict()


@photo_routes.route('/<int:id>/comments', methods=['POST'])
def create_comment(id):
    form = CommentForm()
    # print("************CREATE NEW COMMENT********************")
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        data = form.data
        new_comment = Comment(
            userId=current_user.get_id(),
            photoId=id,
        )
        for key, value in data.items():
            setattr(new_comment, key, value)
        form.populate_obj(new_comment)
        db.session.add(new_comment)
        db.session.commit()
        # print('*********************CREATED COMMENT*******************************')
        return new_comment.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


@photo_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_photo(id):
    photo = Photo.query.get(id)
    if photo:
        db.session.delete(photo)
        db.session.commit()
        return "Successfully Deleted Photo"
    else:
        return "Photo not found"


@photo_routes.route('/', methods=['POST'])
@login_required
def create_photo():
    # print("************CREATE NEW PHOTO********************")
    form = PhotoForm()
    #!POSTMAN Testing
    # data = request.json
    # print(data)
    # new_photo = photo(userId=current_user.get_id(),title=data['title'], url=data['url'], imageUrl=data['imageUrl'])
    # print(form.data)
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        # new_photo = Photo(userId=current_user.get_id(),
        #               title=data['title'], description=data['description'], imageUrl=data['imageUrl'])
        new_photo = Photo(userId=current_user.get_id())
        for key, value in data.items():
            setattr(new_photo, key, value)
        form.populate_obj(new_photo)
        # print('*********************CREATED PHOTO*******************************')
        db.session.add(new_photo)
        db.session.commit()
        return new_photo.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


@photo_routes.route('/<int:id>', methods=["PATCH", "PUT"])
@login_required
def edit_photo(id):
    # data = request.json
    # print('*********************EDIT PHOTO*******************************')
    # print(data)

    # photo = photo.query.get(id)
    # print(photo)
    # for key, value in data.items():
    #     setattr(photo, key, value)
    # db.session.commit()
    # print('*********************UPDATED PHOTO*******************************')
    form = PhotoForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # print('*********************EDIT PHOTO*******************************')
        data = form.data
        photo = Photo.query.get(id)
        # print(photo)
        for key, value in data.items():
            setattr(photo, key, value)
        # photo.title = data['title']
        # photo.url = data['url']
        # photo.imageUrl = data['imageUrl']
        # print('*********************UPDATED photo*******************************')
        db.session.commit()
        return photo.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400
