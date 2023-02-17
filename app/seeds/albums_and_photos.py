from app.models import db, Album, Photo, environment, SCHEMA
from .images_lists import cake_images, camp_images, christmas_images, decor_images, dog_images, food_images, halloween_images, nature_images, plant_images, puppies_images, snow_images, wedding_flower_images, wedding_images, user_images


def seed_albums_and_photos():


    # data = []

    demoAlbum = [Album(userId=1, title='Random',
                      imageUrl='https://m.media-amazon.com/images/I/81QVIs34c0L._AC_UX679_.jpg')]
    demoPhotos = [
        Photo(userId=1, title="demo1",
              imageUrl="https://m.media-amazon.com/images/I/81fs-GWce2L._AC_SX679_.jpg"),
        Photo(userId=1, title="demo2",
              imageUrl="https://m.media-amazon.com/images/I/41gl-9qjJbS._SX300_SY300_QL70_FMwebp_.jpg"),
        Photo(userId=1, title="demo3",
              imageUrl="https://m.media-amazon.com/images/I/51UXG263MVS._AC_SX679_.jpg"),
        Photo(userId=1, title="demo4",
              imageUrl="https://m.media-amazon.com/images/I/71jLR8KuCtL._AC_SX466_.jpg"),
        Photo(userId=1, title="demo5",
              imageUrl="https://m.media-amazon.com/images/I/71aq6HsZiKS._AC_UX522_.jpg"),
        Photo(userId=1, title="demo6",
              imageUrl="https://m.media-amazon.com/images/I/51+VYoYNcLL._AC_SX300_SY300_.jpg"),
        Photo(userId=1, title="demo7",
              imageUrl="https://m.media-amazon.com/images/I/81QJ34tuTgL._AC_SX466_.jpg"),
        Photo(userId=1, title="demo8",
              imageUrl="https://m.media-amazon.com/images/I/81ObX8a-OQL.__AC_SX300_SY300_QL70_FMwebp_.jpg"),
        Photo(userId=1, title="demo9",
              imageUrl="https://m.media-amazon.com/images/I/51z8jIB898L._SX300_SY300_QL70_FMwebp_.jpg"),
        Photo(userId=1, title="demo10",
              imageUrl="https://m.media-amazon.com/images/I/81943kgHgHL._AC_SY879_.jpg"),


    ]

    # data.append(demoAlbum)
    # data.append(demoPhotos)

    db.session.add_all(demoPhotos)
    db.session.add_all(demoAlbum)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the albums table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.


def undo_albums_and_photos():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.albums RESTART IDENTITY CASCADE;")
    else:
        # db.session.execute("DELETE FROM pinnings CASCADE")
        db.session.execute("DELETE FROM photos CASCADE")
        db.session.execute("DELETE FROM albums CASCADE")

    db.session.commit()
