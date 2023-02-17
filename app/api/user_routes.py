from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, db

user_routes = Blueprint('users', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@user_routes.route('/')
# @login_required
def users():
    print('************ GET ALL USERS ****************')

    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
# @login_required
def user(id):

    print('**************** GET 1 USER ****************')

    user = User.query.get(id)
    return user.to_dict()

# @user_routes.route('/<int:id>', methods=['PUT'])
# # @login_required
# def edit_user(id):
#     # print('*********************EDIT User*******************************')
#     # form = ProfileForm()
#     form['csrf_token'].data = request.cookies['csrf_token']

#     if form.validate_on_submit():

#         data = form.data
#         # print(data, 'helloo from backend')

#         user= User.query.get(id)
#         for key, value in data.items():
#             setattr(user, key, value)
#         # print('*********************UPDATED User*******************************')
#         db.session.commit()

#         return user.to_dict_with_related()
#     return {'errors': validation_errors_to_error_messages(form.errors)}, 400
