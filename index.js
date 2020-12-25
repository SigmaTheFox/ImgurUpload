const fetch = require('node-fetch');
const { URLSearchParams } = require("url");
const params = new URLSearchParams();
const APIurl = "https://api.imgur.com/3";

const { clientID, imageURL, albumHash, deleteHash } = require("./info.json");

function uploadImage(imageURL, title = "", albumHash) {
    if (!imageURL) return console.error(Error("No Image URL defined"));
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
        .then(json => {
            console.log(json)
            //console.log(`Delete Hash: ${json.data.deletehash}, Image URL: ${json.data.link}`)
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
        .then(json => console.log(json))
}

//uploadImage(imageURL)
deleteImage(deleteHash)