# Pholickr Clone

Check out a live version of Pholickr here:
[Pholickr Clone Live][Render]

[Render]: https://pholickr.onrender.com/

Pholickr is a clone of the website Flickr, application where people can post and share photos.
The backend of Pholickr is built on python with a PostgreSQL database. Frontend
rendering is handled with React.

## Features & Implementation

### Single-Page App

*React router and components*

Pholickr is a multipage app. All “pages” are first rendered at a root url “/” then routed to the associated from user interaction.
The React router handles the logic associated with component navigation, and directs to the corresponding route.
Re-rendering of child components is done through the React API.

*Frontend and Backend Interaction*

Pholickr server interactions are limited to retrieval of data from and
modification of the database. The front end stores the necessary information for
rendering upon site entry. Other requests are made on a “need to know” basis by
various React components. This minimizes info passed between the frontend
and backend and allows for speedy re-rendering handled by React.

###Authentication

*Auth Page*

![Auth Preview](https://github.com/ChrisChan8551/pholickr/blob/main/documentation/homepage%20sample.JPG)

*Normal Authentication*

Users of the site are required to authenticate or sign up. User will not be able to view content without signing up or loggin in.
The user model requires a unique username and password for
sign up. Upon account creation, user passwords are using the flask libraries.
Authentication uses flask libraries to match user and passwords stored on the database

*Attributes*

Photos and Albums are the most important Models of this application.

The Album table has columns for `Title`, `photoId`, `userId`, and
`image`. `userId` is the identifier for users in the
application interface.

Photos consist of a `userId`, `title`, `description`, and `imageUrl`.
`userId` is a foreign key pointing to the photo belongs to.

Followers and following consist of foreign keys pointing to `users.id`.

*CRUD architecture*

Pholickr lets users create, read, update, and delete albums / photos. Then follow and unfollow users of interest.
React components exist for each corresponding action in the app. Information
needed for all components or user actions performed.

[Backend Routes]
[Backend Routes]: https://github.com/ChrisChan8551/pholickr/blob/main/documentation/backend_routes.md

**Discover Page: Shows recent photos from users**

Pictures of recent photos are displayed once logged in. User can select photos that they are intested in. It will be directed to Photo Detail where
user can click url link which directs user to the source of the photo.

*Example Home Page*
![Home Page Preview](https://github.com/ChrisChan8551/pholickr/blob/main/documentation/homepage%20sample.JPG)

The user can...
1. Select and view photos that they are interested in.
2. Photo can be commented on.
3. Photos can be edited if it belongs to the user
4. Follow / Unfollow creator of the photo


**Photos**
Photos are items that user posted. They can add title and description.
Once created, it will be displayed on their my photos page, and added to the home page.

Any user can view, create, edit, and delete comments with associated photo.

**Albums**
Album is a collection of photos that user adds. They can create their a album of a certain title, and add photos to it.
Albums can be created, edited, and deleted as needed.

**User page**

User page displays users' photos with count of followers / following


From here, user can view
1) Followers and people that they follow.
2) Users's Photos

**Following / Follwers**
User can click and display list of users that they follow or people that follow them.
