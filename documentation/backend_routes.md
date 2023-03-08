# API-Routes

This web app uses the following API routes to dynamically update the page to create a single-page-app-like feel for the user for specific features.

## User
* A logged in user can create account
  * `POST /api/users`
  * `GET /api/users`

## Photos

* A logged in user can get, create, edit or delete a photo with visible confirmation without causing a refresh/redirect.

  * `POST /api/photos`
  * `GET /api/photos`
  * `PUT /api/photos/:photoId`
  * `DELETE /api/photos/:photoId`

  ## Albums

  * A logged in user can get, create, edit or delete a album with visible confirmation without causing a refresh/redirect.

  * `POST /api/comments`
  * `GET /api/albums`
  * `PUT /api/albums/:albumId`
  * `DELETE /api/albums/:albumId`

## Following/Followers
  * `GET /api/followers` current user viewing their followers
  * `GET /api/following` current user viewing their following
  * `GET /api/users/:userId/followers` view anothers user's followers list
  * `GET /api/users/:userId/following` view another user's following list

  * `POST /api/follow/:userId` add a follower
  * `DELETE /api/unfollow/:userId` delete a follower

## Comments
  * `POST /api/comments`
  * `GET /api/comments`
  * `PUT /api/comments/:commentId`
  * `DELETE /api/comments/:commentId`


##  Homepage
 * `GET /api/`
