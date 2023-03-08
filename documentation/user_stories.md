# User Stories

## Profile
* As a logged in user, I can create and view my photos page.
  * `POST /api/users`
  * `GET /api/users/userId`


### Sign Up

* As an unregistered and unauthorized user, I want to be able to sign up for the website via a sign-up form.
  * When I'm on the `/signup` page:
    * I would like to be able to enter my email, username, and preferred password on a clearly laid out form.
    * I would like the website to log me in upon successful completion of the sign-up form.
      * So that I can seamlessly access the site's functionality
  * When I enter invalid data on the sign-up form:
    * I would like the website to inform me of the validations I failed to pass, and repopulate the form with my valid entries (except my password).
    * So that I can try again without needing to refill forms I entered valid data into.

### Log in

* As a registered and unauthorized user, I want to be able to log in to the website via a log-in form.
  * When I'm on the `/login` page:
    * I would like to be able to enter my email and password on a clearly laid out form.
    * I would like the website to log me in upon successful completion of the lob-up form.
  * When I enter invalid data on the log-up form:
    * I would like the website to inform me of the validations I failed to pass, and repopulate the form with my valid entries (except my password).
      * So that I can try again without needing to refill forms I entered valid data into.

### Demo User

* As an unregistered and unauthorized user, I would like an easy to find and clear button on both the `/signup` and `/login` pages to allow me to visit the site as a guest without signing up or logging in.
  * When I'm on either the `/signup` or `/login` pages:
    * I can click on a Demo User button to log me in and allow me access as a normal user.
      * So that I can test the site's features and functionality without needing to stop and enter credentials.

### Log Out

* As a logged in user, I want to log out via an easy to find log out button on the navigation bar.
  * While on any page of the site:
    * I can log out of my account and be redirected to a page displaying recent photos. So that I can easily log out to keep my information secure.

## Discover Feed on Home Page
* As a logged in user, I want to be able to view the discover feed on the homepage that consists
  * of random photos `/`

## Photos

### Create Photos

* As a logged in user, I want to be able to post new Photos.
  * When I'm on the `/photos` page:
    * I can write and submit a new photos.
      * So that I can share my thoughts and memes with my friends.

### Viewing Photos

* As a logged in _or_ logged out user, I want to be able to view a selection of the most recent photos.
  * When I'm on the `/photos` page:
    * I can view the ten most recently posted photos.
      * So that I can read and interact with the thoughts and memes of my friends.

* As a logged in _or_ logged out user, I want to be able to view a specific photo, creator, and followers.
  * When I'm on the `/photos/:photoId` page:
    * I can view the content of the photos with a title and description
    * I can follow the creator
    * I can see the profile picture of the creator
    * I can add,edit,delete comments

### Updating Photos

* As a logged in user, I want to be able to edit my photos by clicking an Edit button associated with the photos.
  * When I'm on the `/photos/:photoId` page:
    * I can click "Edit" to make permanent changes to photos I have posted.
      * So that I can fix any errors I make in my photos.

### Deleting Photos

* As a logged in user, I want to be able to delete my photos by clicking a Delete button associated with the photos anywhere that photos appears.
  * When I'm on the `/photos/:photoId` page:
    * I can click "Delete" to permanently delete a photo I have posted.


### Create Albums

* As a logged in user, I want to be able to create new Albums.
  * When I'm on the `/Albums` page:
    * I can create a new album
    * I can add photos from my photos page once album has been created

### Viewing Albums

* As a logged in user, I want to be able to view all albums.
  * When I'm on the `/albums` page:
    * I can view all of my created albums.

* As a logged in user, I want to be able to view a specific albums, or specific album with associated photos.
  * When I'm on the `/albums/:albumId` page:
    * I can view the content of the albums with a title.
    * I can click into specific photo for more detailed view.

### Updating Albums

* As a logged in user, I want to be able to edit my albums by clicking an Edit button associated with the albums.
  * When I'm on the `/albums/:albumId` page:
    * I can click "Edit" to make permanent changes to albums I have posted.
      * So that I can fix any errors I make in my albums.

### Deleting Albums

* As a logged in user, I want to be able to delete my albums by clicking a Delete button associated with the albums anywhere that albums appears.
  * When I'm on the `/albums/:albumId` page:
    * I can click "Delete" to permanently delete a album I have posted.
      *

### Followers and following

* As a logged in user, I want to be able to view my followers `/followers` and who I am following `/following`.
* As a logged in user, I want to be able to view other users' followers `/users/:userId/followers`and who they are following `/users/:userId/following`.
* As a logged in user, I want to be able to follow and unfollow a user `/followers/:userId`.


### Comments
* As a logged in user, when I view a photo `/photos/photoId`. I can view `/photos/photoId` make, edit, and delete comments `comments/commentId` that belong to me.
