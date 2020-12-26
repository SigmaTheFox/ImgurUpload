const fetch = require('node-fetch');
const { URLSearchParams } = require("url");
const params = new URLSearchParams();
const APIurl = "https://api.imgur.com/3";

const { clientID, imageURL, albumHash, albumID, deleteHash } = require("./info.json");

function createAlbum(albumTitle = "", albumDescription = "", albumPrivacy = "hidden") {
    params.append("title", albumTitle);
    params.append("description", albumDescription);
    params.append("privacy", albumPrivacy);

    fetch(`${APIurl}/album`, {
        method: "post",
        body: params,
        headers: { "Authorization": `Client-ID ${clientID}` }
    })
        .then(res => res.json())
        .catch(err => console.error(Error("There was an error")))
        .then(json => {
            if (json.status !== 200) return console.error(Error(json.data.error));
            console.log(json)
        })
}

function deleteAlbum(albumHash) {
    if (!albumHash) return console.error(Errro("The Album Hash isn't defined"));

    fetch(`${APIurl}/album/${albumHash}`, {
        method: "delete",
        headers: { "Authorization": `Client-ID ${clientID}` },
        body: ""
    })
        .then(res => res.json())
        .catch(err => console.error(Error("There was an error")))
        .then(json => {
            if (json.status !== 200) return console.error(Error(json.data.error));
            console.log(json)
        })
}

function getAlbum(albumID) {
    if (!albumID) return console.error(Error("The Album hash isn't defined"));
    fetch(`${APIurl}/album/${albumID}`, {
        method: "get",
        headers: { "Authorization": `Client-ID ${clientID}` }
    })
    .then(res => res.json())
    .catch(err => console.error(Error("There was an error")))
    .then(json => {
        if (json.status !== 200) return console.error(Error(json.data.error));
        console.log(json)
        console.log(json.data.images)
    })
}

function uploadImage(imageURL, title = "", albumHash) {
    if (!imageURL) return console.error(Error("The Image URL isn't defined"));
    if (albumHash) params.append("album", albumHash);

    params.append("image", imageURL);
    params.append("type", "url");
    params.append("title", title);

    fetch(`${APIurl}/upload`, {
        method: "post",
        body: params,
        headers: { "Authorization": `Client-ID ${clientID}` }
    })
        .then(res => res.json())
        .catch(err => console.error(Error("There was an error")))
        .then(json => {
            if (json.status !== 200) return console.error(Error(json.data.error));
            console.log(json)
        })
}

function deleteImage(deleteHash) {
    if (!deleteHash) return console.error(Error("The Delete Hash isn't defined"));

    fetch(`${APIurl}/image/${deleteHash}`, {
        method: "delete",
        headers: { "Authorization": `Client-ID ${clientID}` },
        body: ""
    })
        .then(res => res.json())
        .catch(err => console.error(Error("There was an error")))
        .then(json => {
            if (json.status !== 200) return console.error(Error(json.data.error));
            console.log(json)
        })
}

//createAlbum()
//deleteAlbum(albumHash)
getAlbum(albumID)
//uploadImage(imageURL, "", albumHash)
//deleteImage(deleteHash)