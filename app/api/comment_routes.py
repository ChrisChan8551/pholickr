from flask import Blueprint, jsonify, render_template, redirect, request
from flask_login import login_required, current_user
from app.models import Comment, db
from app.forms import CommentForm

comment_routes = Blueprint('comments', __name__)


def validation_errors_to_error_messages(validation_errors):

    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@comment_routes.route('/', methods=['GET'])
# @login_required
def get_all_comments():
    comments = Comment.query.all()
    # print('********GET ALL COMMENTS********')
    # print([comment.to_dict() for comment in comments])
    return jsonify([comment.to_dict() for comment in comments])


@comment_routes.route('/<int:id>')
# @login_required
def get_comment(id):
    # print('************GET 1 COMMENT********************')
    comment = Comment.query.get(id)
    return comment.to_dict()


@comment_routes.route('/<int:id>', methods=['DELETE'])
# @login_required
def delete_comment(id):
    comment = Comment.query.get(id)
    if comment:
        db.session.delete(comment)
        db.session.commit()
        return "Successfully Deleted Comment"
    else:
        return "Comment not found"


@comment_routes.route('/<int:id>', methods=["PATCH", "PUT"])
# @login_required
def edit_comment(id):
    # data = request.json
    # print('*********************EDIT COMMENT*******************************')
    # print(data)

    # comment = comment.query.get(id)
    # print(comment)
    # for key, value in data.items():
    #     setattr(comment, key, value)
    # db.session.commit()
    # print('*********************UPDATED COMMENT*******************************')
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # print('*********************EDIT COMMENT*******************************')
        data = form.data
        comment = Comment.query.get(id)
        # print(comment)
        for key, value in data.items():
            setattr(comment, key, value)
        # comment.title = data['title']
        # comment.url = data['url']
        # comment.imageUrl = data['imageUrl']
        # print('*********************UPDATED comment*******************************')
        db.session.commit()
        return comment.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400
