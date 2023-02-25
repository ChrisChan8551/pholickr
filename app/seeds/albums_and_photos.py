from app.models import db, Album, Photo, environment, SCHEMA
from .images_lists import cake_images, camp_images, christmas_images, decor_images, dog_images, food_images, halloween_images, nature_images, plant_images, puppies_images, snow_images, wedding_flower_images, wedding_images, user_images

# Adds a demo album, you can add other albums here if you want


def create_album_with_photos(db, user_id, album_title, album_image, photo_image_list):
    album = Album(userId=user_id, title=album_title, imageUrl=album_image)
    db.session.add(album)

    photo_num = 0
    for photo_image in list(set(photo_image_list)):
        photo_num = photo_num + 1
        photo = Photo(
            userId=user_id, title=f"{album_title} {photo_num}",description='description', imageUrl=photo_image)

        album.photos.append(photo)
        db.session.add(photo)

    db.session.commit()


def seed_albums_and_photos():

    create_album_with_photos(
        db, 13, 'Cakes',
        'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&w=600&q=60',
        cake_images
    )

    create_album_with_photos(
        db, 12, 'Summer Camp',
        'https://images.unsplash.com/photo-1517164850305-99a3e65bb47e?auto=format&w=600&q=60',
        camp_images
    )

    create_album_with_photos(
        db, 1, 'Christmas',
        'https://images.unsplash.com/photo-1543589077-47d81606c1bf?auto=format&w=600&q=60',
        christmas_images
    )

    create_album_with_photos(
        db, 1, 'Decor',
        'https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&w=600&q=60',
        decor_images
    )

    create_album_with_photos(
        db, 1, 'Dogs I Want',
        'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&w=600&q=60',
        dog_images
    )

    create_album_with_photos(
        db, 11, 'Food',
        'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&w=600&q=60',
        food_images
    )

    create_album_with_photos(
        db, 10, 'Halloween',
        'https://images.unsplash.com/photo-1633628569245-1a939e025ebb?auto=format&w=600&q=60',
        halloween_images
    )

    create_album_with_photos(
        db, 1, 'Nature',
        'https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&w=600&q=60',
        nature_images
    )

    create_album_with_photos(
        db, 9, 'Plants',
        'https://images.unsplash.com/photo-1463554050456-f2ed7d3fec09?auto=format&w=600&q=60',
        plant_images
    )

    create_album_with_photos(
        db, 4, 'Puppies',
        'https://images.unsplash.com/photo-1525253013412-55c1a69a5738?auto=format&w=600&q=60',
        puppies_images
    )

    create_album_with_photos(
        db, 7, 'Snowboarding',
        'https://images.unsplash.com/photo-1611124600582-c9ef0e977585?auto=format&w=600&q=60',
        snow_images
    )

    create_album_with_photos(
        db, 8, 'Wedding Flowers',
        'https://images.unsplash.com/photo-1593470309378-bf460a1c7f10?auto=format&w=600&q=60',
        wedding_flower_images
    )

    create_album_with_photos(
        db, 8, 'Wedding Ideas',
        'https://images.unsplash.com/photo-1610173827043-9db50e0d8ef9?auto=format&w=600&q=60',
        wedding_images
    )

    data = []

    demoAlbum = Album(userId=1, title='Random',
                      imageUrl='https://m.media-amazon.com/images/I/81QVIs34c0L._AC_UX679_.jpg')
    demoPhotos = [
        Photo(userId=1, title="demo1", description='description',
              imageUrl="https://m.media-amazon.com/images/I/81fs-GWce2L._AC_SX679_.jpg"),
        Photo(userId=1, title="demo2", description='description',
              imageUrl="https://m.media-amazon.com/images/I/41gl-9qjJbS._SX300_SY300_QL70_FMwebp_.jpg"),
        Photo(userId=1, title="demo3", description='description',
              imageUrl="https://m.media-amazon.com/images/I/51UXG263MVS._AC_SX679_.jpg"),
        Photo(userId=1, title="demo4", description='description',
              imageUrl="https://m.media-amazon.com/images/I/71jLR8KuCtL._AC_SX466_.jpg"),
        Photo(userId=1, title="demo5", description='description',
              imageUrl="https://m.media-amazon.com/images/I/71aq6HsZiKS._AC_UX522_.jpg"),
        Photo(userId=1, title="demo6", description='description',
              imageUrl="https://m.media-amazon.com/images/I/51+VYoYNcLL._AC_SX300_SY300_.jpg"),
        Photo(userId=1, title="demo7", description='description',
              imageUrl="https://m.media-amazon.com/images/I/81QJ34tuTgL._AC_SX466_.jpg"),
        Photo(userId=1, title="demo8", description='description',
              imageUrl="https://m.media-amazon.com/images/I/81ObX8a-OQL.__AC_SX300_SY300_QL70_FMwebp_.jpg"),
        Photo(userId=1, title="demo9", description='description',
              imageUrl="https://m.media-amazon.com/images/I/51z8jIB898L._SX300_SY300_QL70_FMwebp_.jpg"),
        Photo(userId=1, title="demo10", description='description',
              imageUrl="https://m.media-amazon.com/images/I/81943kgHgHL._AC_SY879_.jpg"),


    ]

    for photo in demoPhotos:
        demoAlbum.photos.append(photo)

    data.append(demoAlbum)
    data.extend(demoPhotos)

    cherryAlbum = Album(userId=2, title='Boba',
                        imageUrl='https://m.media-amazon.com/images/I/51AcI6uBEtL._SX300_SY300_QL70_FMwebp_.jpg')
    cherryPhotos = [
        Photo(userId=2, title="cherry1", description='description',
              imageUrl="https://m.media-amazon.com/images/I/41uKZA6ligL._SX300_SY300_QL70_FMwebp_.jpg"),
        Photo(userId=2, title="cherry2", description='description',
              imageUrl="https://m.media-amazon.com/images/I/51Vc+Rc+1NL.jpg"),
        Photo(userId=2, title="cherry3", description='description',
              imageUrl="https://m.media-amazon.com/images/I/81Mrwm4nt6L._AC_SX522_.jpg"),
        Photo(userId=2, title="cherry4", description='description',
              imageUrl="https://m.media-amazon.com/images/I/710XgEjpNbL._SX569_.jpg"),
        Photo(userId=2, title="cherry5", description='description',
              imageUrl="https://m.media-amazon.com/images/I/91R1-3yQZGL._SX679_.jpg"),
        Photo(userId=2, title="cherry6", description='description',
              imageUrl="https://m.media-amazon.com/images/I/41wpLOhiZ2L._SX300_SY300_QL70_FMwebp_.jpg"),
        Photo(userId=2, title="cherry7", description='description',
              imageUrl="https://m.media-amazon.com/images/I/71dAp6HqmwL._SY679_.jpg"),
        Photo(userId=2, title="cherry8", description='description',
              imageUrl="https://m.media-amazon.com/images/I/716psxxhg0L.__AC_SX300_SY300_QL70_FMwebp_.jpg"),
        Photo(userId=2, title="cherry9", description='description',
              imageUrl="https://m.media-amazon.com/images/I/71AVLhfKb0L.__AC_SX300_SY300_QL70_FMwebp_.jpg"),
        Photo(userId=2, title="cherry10", description='description',
              imageUrl="https://m.media-amazon.com/images/I/815MnOmXNBL._AC_SX466_PIbundle-12,TopRight,0,0_SH20_.jpg"),

    ]

    for photo in cherryPhotos:
        cherryAlbum.photos.append(photo)

    data.append(cherryAlbum)
    data.extend(cherryPhotos)

    jimmyAlbum = Album(userId=3, title='Games',
                       imageUrl='https://m.media-amazon.com/images/I/81zg1vHpbkL._SX522_.jpg')
    jimmyPhotos = [
        Photo(userId=3, title="jimmy1", description='description',
              imageUrl="https://m.media-amazon.com/images/I/81mQ7xi9rOL._AC_SX679_.jpg"),
        Photo(userId=3, title="jimmy2", description='description',
              imageUrl="https://m.media-amazon.com/images/I/81jtTi1MIDL._SX522_.jpg"),
        Photo(userId=3, title="jimmy3", description='description',
              imageUrl="https://m.media-amazon.com/images/I/61o7uSPBWpL._AC_SX679_.jpg"),
        Photo(userId=3, title="jimmy4", description='description',
              imageUrl="https://m.media-amazon.com/images/I/81cY7DwfO+S._SY500_.jpg"),
        Photo(userId=3, title="jimmy5", description='description',
              imageUrl="https://m.media-amazon.com/images/I/716xLw0R9+L._SY500_.jpg"),
        Photo(userId=3, title="jimmy6", description='description',
              imageUrl="https://m.media-amazon.com/images/I/710yeNqefxL._SX522_.jpg"),
        Photo(userId=3, title="jimmy7", description='description',
              imageUrl="https://m.media-amazon.com/images/I/61rt14PIodL.__AC_SY300_SX300_QL70_FMwebp_.jpg"),
        Photo(userId=3, title="jimmy8", description='description',
              imageUrl="https://m.media-amazon.com/images/I/61Sz2zvfSfL._AC_SX466_.jpg"),
        Photo(userId=3, title="jimmy9", description='description',
              imageUrl="https://m.media-amazon.com/images/I/81hVcGkaMBL._AC_SX522_.jpg"),
        Photo(userId=3, title="jimmy10", description='description',
              imageUrl="https://m.media-amazon.com/images/I/710UJzpZN+L._SX522_.jpg"),

    ]

    for photo in jimmyPhotos:
        jimmyAlbum.photos.append(photo)

    data.append(jimmyAlbum)
    data.extend(jimmyPhotos)

    chrisAlbum = Album(userId=5, title='Fishing',
                       imageUrl='https://m.media-amazon.com/images/I/81eV6R7IIPL._AC_SX679_.jpg')
    chrisPhotos = [
        Photo(userId=5, title="chris1", description='description',
              imageUrl="https://m.media-amazon.com/images/I/81eV6R7IIPL._AC_SX679_.jpg"),
        Photo(userId=5, title="chris2", description='description',
              imageUrl="https://m.media-amazon.com/images/I/81QyrdVMQzL._AC_SX679_.jpg"),
        Photo(userId=5, title="chris3", description='description',
              imageUrl="https://m.media-amazon.com/images/I/71EmtPnZtvL._AC_UX679_.jpg"),
        Photo(userId=5, title="chris4", description='description',
              imageUrl="https://m.media-amazon.com/images/I/81ad9FiliFL.__AC_SX300_SY300_QL70_FMwebp_.jpg"),
        Photo(userId=5, title="chris5", description='description',
              imageUrl="https://m.media-amazon.com/images/I/81ju-MJ46NL.__AC_SX300_SY300_QL70_FMwebp_.jpg"),
        Photo(userId=5, title="chris6", description='description',
              imageUrl="https://m.media-amazon.com/images/I/71qk-VX7LEL._AC_SX679_.jpg"),
        Photo(userId=5, title="chris7", description='description',
              imageUrl="https://m.media-amazon.com/images/I/61EntAvpGeL._AC_SX679_.jpg"),
        Photo(userId=5, title="chris8", description='description',
              imageUrl="https://m.media-amazon.com/images/I/71-JA+kt0nL._AC_SX679_.jpg"),
        Photo(userId=5, title="chris9", description='description',
              imageUrl="https://m.media-amazon.com/images/I/71Wz8M+7NGS._AC_SX466_.jpg"),
        Photo(userId=5, title="chris10", description='description',
              imageUrl="https://m.media-amazon.com/images/I/71DXNv9d8KL.__AC_SX300_SY300_QL70_FMwebp_.jpg"),

    ]

    for photo in chrisPhotos:
        chrisAlbum.photos.append(photo)

    data.append(chrisAlbum)
    data.extend(chrisPhotos)

    derekAlbum = Album(userId=5, title='Computer Systems',
                       imageUrl='https://m.media-amazon.com/images/I/81OIn7984vS._AC_SX679_.jpg')
    derekPhotos = [
        Photo(userId=6, title="derek1", description='description',
              imageUrl="https://m.media-amazon.com/images/I/81OIn7984vS._AC_SX679_.jpg"),
        Photo(userId=6, title="derek2", description='description',
              imageUrl="https://m.media-amazon.com/images/I/61cXu9yGldL.__AC_SX300_SY300_QL70_FMwebp_.jpg"),
        Photo(userId=6, title="derek3", description='description',
              imageUrl="https://m.media-amazon.com/images/I/91jZtQCewFL.__AC_SX300_SY300_QL70_FMwebp_.jpg"),
        Photo(userId=6, title="derek4", description='description',
              imageUrl="https://m.media-amazon.com/images/I/81J6OIX+RBL._AC_SY300_SX300_.jpg"),
        Photo(userId=6, title="derek5", description='description',
              imageUrl="https://m.media-amazon.com/images/I/816nxSZz+WS._AC_SY300_SX300_.jpg"),
        Photo(userId=6, title="derek6", description='description',
              imageUrl="https://m.media-amazon.com/images/I/91gHKdBAydL._AC_SX679_.jpg"),
        Photo(userId=6, title="derek7", description='description',
              imageUrl="https://m.media-amazon.com/images/I/71sgTE7o2oL.__AC_SX300_SY300_QL70_FMwebp_.jpg"),
        Photo(userId=6, title="derek8", description='description',
              imageUrl="https://m.media-amazon.com/images/I/91g0K9gzxDS.__AC_SX300_SY300_QL70_FMwebp_.jpg"),
        Photo(userId=6, title="derek9", description='description',
              imageUrl="https://m.media-amazon.com/images/I/71WkZn95jlL.__AC_SX300_SY300_QL70_FMwebp_.jpg"),
        Photo(userId=6, title="derek10", description='description',
              imageUrl="https://m.media-amazon.com/images/I/818SNa1ruZL.__AC_SX300_SY300_QL70_FMwebp_.jpg"),

    ]

    for photo in derekPhotos:
        derekAlbum.photos.append(photo)

    data.append(derekAlbum)
    data.extend(derekPhotos)

    amansAlbum = Album(userId=6, title='Doggie Stuff',
                       imageUrl='https://m.media-amazon.com/images/I/51QOhMS+XyL._AC_UX569_.jpg')
    amansPhotos = [
        Photo(userId=4, title="aman1", description='description',
              imageUrl="https://m.media-amazon.com/images/I/51QOhMS+XyL._AC_UX569_.jpg"),
        Photo(userId=4, title="aman2", description='description',
              imageUrl="https://m.media-amazon.com/images/I/61Sr2dbh-OL.__AC_SX300_SY300_QL70_FMwebp_.jpg"),
        Photo(userId=4, title="aman3", description='description',
              imageUrl="https://m.media-amazon.com/images/I/81R+9k+ZijL._AC_SX466_.jpg"),
        Photo(userId=4, title="aman4", description='description',
              imageUrl="https://m.media-amazon.com/images/I/714M4n5xTWL._AC_SX466_.jpg"),
        Photo(userId=4, title="aman5", description='description',
              imageUrl="https://m.media-amazon.com/images/I/61sIr-iTVNL._AC_SX466_.jpg"),
        Photo(userId=4, title="aman6", description='description',
              imageUrl="https://m.media-amazon.com/images/I/71kvYg+Ln0L._AC_SX466_.jpg"),
        Photo(userId=4, title="aman7", description='description',
              imageUrl="https://m.media-amazon.com/images/I/41pYv9GZFoL.__AC_SY300_SX300_QL70_FMwebp_.jpg"),
        Photo(userId=4, title="aman8", description='description',
              imageUrl="https://m.media-amazon.com/images/I/81x0BR1AcPL._AC_SX466_.jpg"),
        Photo(userId=4, title="aman9", description='description',
              imageUrl="https://m.media-amazon.com/images/I/619MrMjvT5L._AC_SX466_.jpg"),
        Photo(userId=4, title="aman10", description='description',
              imageUrl="https://m.media-amazon.com/images/I/71PDRUZv9wL._AC_UX679_.jpg"),

    ]

    for photo in amansPhotos:
        amansAlbum.photos.append(photo)

    data.append(amansAlbum)
    data.extend(amansPhotos)

    db.session.add_all(data)
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
        db.session.execute("DELETE FROM pinnings CASCADE")
        db.session.execute("DELETE FROM photos CASCADE")
        db.session.execute("DELETE FROM albums CASCADE")

    db.session.commit()
