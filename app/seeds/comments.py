from app.models import db, Comment,User, environment, SCHEMA

import random

def seed_comments():
    user_count = 5
    commentData = []
    for photoId in range(1, 937):
        for _ in range(5):
            random_user_id = random.randint(1, user_count)
            random_user = User.query.filter_by(id=random_user_id).first()
            commentText = random.choice([
                "Awesome photo!",
                "Great shot!",
                "Beautiful scenery!",
                "I love this picture!",
                "Incredible!",
                "Fantastic job!",
                "So cool!",
                "You're a talented photographer!",
                "This is amazing!",
                "Stunning!",
                "I can't stop looking at this!",
                "Speechless!",
                "Wow, just wow!",
                "Impressive work!",
                "This belongs in a gallery!",
                "I'm blown away!",
                "This is breathtaking!",
                "You have a great eye!",
                "I feel like I'm there!",
                "This is art!"
            ])
            commentData.append(Comment(photoId=photoId, user=random_user, text=commentText))

    db.session.add_all(commentData)
    db.session.commit()

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
