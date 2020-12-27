# ImgurUpload
Just something random I decided to work on to understand communicating with APIs a bit better.

## Usage
```JS
const ImgurJS = require("./index.js");
const imgur = new ImgurJS("client", "thisIsAClientID");

// Create an album. Everything is optional, by default there is no title, no description and the album is hidden
// The privacy options are: "public", "hidden", "secret"
imgur.createAlbum("Album title", "Album description", "privacy")
.then(out => console.log(out))

// Delete an album
imgur.deleteAlbum("Album Delete Hash")
.then(out => console.log(out))

// Get an alum's info
imgur.getAlbum("Album ID")
.then(out => console.log(out))

// Upload Image to imgur (Title and Album are optional)
imgur.uploadMedia("https://doma.in/image.png", "Image title", "Album Delete Hash")
.then(out => console.log(out))

// Delete an uploaded image
imgur.deleteMedia("Image Delete Hash")
.then(out => console.log(out))
```