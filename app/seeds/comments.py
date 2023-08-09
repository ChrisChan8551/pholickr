from app.models import db, Comment, User, Photo
import random

def seed_comments():
    user_ids = User.query.with_entities(User.id).all()
    user_count = len(user_ids)
    comment_texts = [
        "Awesome photo!", "Great shot!", "Beautiful scenery!",
        "I love this picture!", "Incredible!", "Fantastic job!",
        "So cool!", "You're a talented photographer!",
        "This is amazing!", "Stunning!", "I can't stop looking at this!",
        "Speechless!", "Wow, just wow!", "Impressive work!",
        "This belongs in a gallery!", "I'm blown away!",
        "This is breathtaking!", "You have a great eye!",
        "I feel like I'm there!", "This is art!"
    ]

    batch_size = Photo.query.count()

    comment_data = []

    for photo_id in range(1, batch_size):
        random.shuffle(comment_texts)  # Shuffle the commentTexts list
        random_user_id_indices = random.sample(range(user_count), 5)
        random_users = [User.query.get(user_ids[idx][0]) for idx in random_user_id_indices]

        for idx, user in enumerate(random_users):
            comment_data.append({
                "photoId": photo_id,
                "user": user,
                "text": comment_texts[idx]
            })

    db.session.bulk_insert_mappings(Comment, comment_data)
    db.session.commit()



# def seed_comments():
#     commentData = [
#         Comment(photoId=1, userId=1, text='DEMO comment'),
#         Comment(photoId=1, userId=2, text='CHERRY comment'),
#         Comment(photoId=1, userId=3, text='JIMMY comment'),
#         Comment(photoId=1, userId=1, text='DEMO comment'),
#         Comment(photoId=1, userId=2, text='CHERRY comment'),
#         Comment(photoId=1, userId=3, text='JIMMY comment'),
#         Comment(photoId=1, userId=1, text='DEMO comment'),
#         Comment(photoId=1, userId=2, text='CHERRY comment'),
#         Comment(photoId=1, userId=3, text='JIMMY comment'),
#         Comment(photoId=1, userId=1, text='DEMO comment'),
#         Comment(photoId=2, userId=1, text='DEMO comment'),
#         Comment(photoId=2, userId=2, text='CHERRY comment'),
#         Comment(photoId=2, userId=3, text='JIMMY comment'),
#         Comment(photoId=2, userId=1, text='DEMO comment'),
#         Comment(photoId=2, userId=2, text='CHERRY comment'),
#         Comment(photoId=2, userId=3, text='JIMMY comment'),
#         Comment(photoId=2, userId=1, text='DEMO comment'),
#         Comment(photoId=2, userId=2, text='CHERRY comment'),
#         Comment(photoId=2, userId=3, text='JIMMY comment'),
#         Comment(photoId=2, userId=1, text='DEMO comment'),
#         Comment(photoId=3, userId=1, text='DEMO comment'),
#         Comment(photoId=3, userId=2, text='CHERRY comment'),
#         Comment(photoId=3, userId=3, text='JIMMY comment'),
#         Comment(photoId=3, userId=1, text='DEMO comment'),
#         Comment(photoId=3, userId=2, text='CHERRY comment'),
#         Comment(photoId=3, userId=3, text='JIMMY comment'),
#         Comment(photoId=3, userId=1, text='DEMO comment'),
#         Comment(photoId=3, userId=2, text='CHERRY comment'),
#         Comment(photoId=3, userId=3, text='JIMMY comment'),
#         Comment(photoId=3, userId=1, text='DEMO comment'),
#         Comment(photoId=4, userId=1, text='DEMO comment'),
#         Comment(photoId=4, userId=2, text='CHERRY comment'),
#         Comment(photoId=4, userId=3, text='JIMMY comment'),
#         Comment(photoId=4, userId=1, text='DEMO comment'),
#         Comment(photoId=4, userId=2, text='CHERRY comment'),
#         Comment(photoId=4, userId=3, text='JIMMY comment'),
#         Comment(photoId=4, userId=1, text='DEMO comment'),
#         Comment(photoId=4, userId=2, text='CHERRY comment'),
#         Comment(photoId=4, userId=3, text='JIMMY comment'),
#         Comment(photoId=4, userId=1, text='DEMO comment'),
#         Comment(photoId=5, userId=1, text='DEMO comment'),
#         Comment(photoId=5, userId=2, text='CHERRY comment'),
#         Comment(photoId=5, userId=3, text='JIMMY comment'),
#         Comment(photoId=5, userId=1, text='DEMO comment'),
#         Comment(photoId=5, userId=2, text='CHERRY comment'),
#         Comment(photoId=5, userId=3, text='JIMMY comment'),
#         Comment(photoId=5, userId=1, text='DEMO comment'),
#         Comment(photoId=5, userId=2, text='CHERRY comment'),
#         Comment(photoId=5, userId=3, text='JIMMY comment'),
#         Comment(photoId=5, userId=1, text='DEMO comment'),

#     ]

#     db.session.add_all(commentData)
#     db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_comments():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM comments CASCADE")

    db.session.commit()
