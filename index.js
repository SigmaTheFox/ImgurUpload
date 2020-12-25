const fetch = require('node-fetch');
const { URLSearchParams } = require("url");
const params = new URLSearchParams();
const url = "https://api.imgur.com/3";


const clientID = "ClientID";
const image = "imageURL";
const deleteHash = "ImageDeleteHash";


function uploadImage(imageURL, title) {
    params.append("image", imageURL);
    params.append("type", "url");
    params.append("title", title);

    fetch(`${url}/upload`, {
        method: "post",
        body: params,
        headers: { "Authorization": `Client-ID ${clientID}` }
    })
        .then(res => res.json())
        .then(json => {
            console.log(`image ID: ${json.data.id}, delete hash: ${json.data.deletehash}, link ${json.data.link}`)
        })
}

function deleteImage(deleteHash) {
    fetch(`${url}/image/${deleteHash}`, {
        method: "delete",
        headers: { "Authorization": `Client-ID ${clientID}` },
        body: ""
    })
        .then(res => res.json())
        .then(json => console.log(json))
}

//uploadImage(image, "ImageTitle")
// deleteImage(deleteHash)