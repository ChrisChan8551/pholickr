import os
from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, User, Photo, Album


user_routes = Blueprint('users', __name__)


def validation_errors_to_error_messages(validation_errors):

    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@user_routes.route('/')
@login_required
def users():

    users = User.query.all()
    # print("**************** GET ALL USERS ****************")
    # print(users)
    return jsonify([user.to_dict_with_related() for user in users])


@user_routes.route('/<int:id>')
@login_required
def user(id):
    # print("**************** GET 1 USER ****************")

    user = User.query.get(id)

    return user.to_dict_with_related()


@user_routes.route('/<int:id>/photos')
@login_required
def user_photos(id):
    photos = Photo.query.filter_by(userId=id)
    return jsonify([photo.to_dict() for photo in photos])


@user_routes.route('/<int:id>/albums')
@login_required
def user_albums(id):
    albums = Album.query.filter_by(userId=id)
    return jsonify([album.to_dict() for album in albums])

# @user_routes.route('/<int:id>', methods=['PUT'])
# @login_required
# def edit_user(id):
#     print('*********************EDIT User*******************************')
#     form = ProfileForm()
#     form['csrf_token'].data = request.cookies['csrf_token']

#     if form.validate_on_submit():

#         data = form.data
#         # print(data, 'helloo from backend')

#         user= User.query.get(id)
#         for key, value in data.items():
#             setattr(user, key, value)
#         print('*********************UPDATED User*******************************')
#         db.session.commit()

#         return user.to_dict_with_related()
#     return {'errors': validation_errors_to_error_messages(form.errors)}, 400


@user_routes.route('/follow/<int:id>', methods=['POST'])
@login_required
def follow(id):
    other_user = User.query.filter_by(id=id).first()

    current_user.follow(other_user)
    db.session.commit()

    return current_user.to_dict_with_related()


@user_routes.route('/unfollow/<int:id>', methods=['POST'])
@login_required
def unfollow(id):
    other_user = User.query.filter_by(id=id).first()

    current_user.unfollow(other_user)
    db.session.commit()

    return current_user.to_dict_with_related()
