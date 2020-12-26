# ImgurUpload
Just something random I decided to work on to understand communicating with APIs a bit better.

## Usage
```JS
// Create an album. Everything is optional, by default there is no title, no description and the album is hidden
// The privacy options are: "public", "hidden", "secret"
createAlbum("Album title", "Album description", "privacy");

// Delete an album
deleteAlbum("Album Delete Hash");

// Upload Image to imgur (Title and Album are optional)
uploadImage("https://doma.in/image.png", "Image title", "Album Delete Hash");

// Delete an uploaded image
deleteImage("Image Delete Hash");
```