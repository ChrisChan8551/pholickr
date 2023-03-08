# User-facing routes

## `/login`

### Log in page

This page displays a log in form

* `GET /login`
* `POST /login`

## `/signup`

This page displays a signup form.

### Sign up page

* `GET /signup`
* `POST /signup`

##  Discover feed/ Splash/Home Page
## `/`

This page displays discover feed if user is logged in, as well as a navigation bar with login/signup or logout buttons. If the user is not logged in, they will be taken to a splash/home page.

* `GET /`

## Profile

## `/users/userId`

This page displays a users photos as well as the count of followers and following. You can click on the followers / following to display the users associated.

 * `GET /users/userId/followers`
 * `GET /users/userId/following`


## Photos
## `/photos`

This page displays the users' photos as well as option to add / remove photos. You can add a photo to an existing album.

  * `POST /photos`
  * `GET /photos`

## Photo Detail Page
## `/photo/:photoId`

This page displays an individual photo as well as a navigation bar with login/signup or logout buttons. If the logged in user owns the photo, this page also displays an update and delete button. Users can also create, edit, delete comments with the associated photo.

* `GET /photos/:photoId`
* `PUT /photos/:photoId`
* `DELETE /photos/:photoId`



## Albums
## `/albums`

This page displays a form with which a logged in user can create a album, as well as a navigation bar with login/signup or logout buttons.

  * `POST /albums`
  * `GET /albums`


## `/albums/:albumId` - Album detail page

This page displays an individual album as well as a navigation bar with login/signup or logout buttons. If the logged in user owns the album, this page also displays an update and delete button. Also displays pictures associated with the album

* `GET /albums/:albumId`
* `PUT /albums/:albumId`
* `DELETE /albums/:albumId`

## Followers

## `/followers`

This page displays a users followers, add and delete followers buttons as well as a navigation bar with login/signup or logout buttons.

  * `GET /followers` current user viewing their followers
  * `POST /followers/:username` add a follower
  * `DELETE /followers/:username` delete a follower

## Following

## `/following`

This page displays a users following.

* `GET /following` current user viewing their following


## Comments

## `/photos/photoId/comments`

Photo detail page that displays users comments.
Can create, edit, and delete comments from there.

  * `GET /comments` get all comments on a photo
  * `POST /photos/photoId/comments` create a comment
  * `PATCH /comments/commentId` edit comment
  * `DELETE /comments/commentId` delete a comment
