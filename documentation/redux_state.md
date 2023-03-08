# Example Redux State

```javascript
{
   users: {
      1: {
         id: 1,
         username: "Demo",
         email: "demo@aa.io"
      },
   },
   photos: {
      1: {
         id: 1,
         userId: 1,
         title: "photo1",
         description: "description1",
         image: "imageUrl"
      },
      2: {
         id: 2,
         userId: 2,
         title: "photo2",
         description: "description2",
         image: "imageUrl"
      },
   },

   album: {
      1: {
         id: 1,
         userId: 1,
         title: "album1",
         image: "imageUrl"


      },
      2: {
         id: 2,
         userId: 1,
         title: "album2",
         image: "imageUrl"


      },
      3: {
         id: 3,
         userId: 2,
         title: "album3",
         image: "imageUrl"
      },
   },
   session: {
      user: {
         id: 1,
         name: "Demo"
      }
   },
   errors: [
         "Unauthorized",
         "Invalid username/password",
      ]
}
```
