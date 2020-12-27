const fetch = require('node-fetch');
const fs = require('fs');
const FormData = require("form-data");
const form = new FormData();
const APIurl = "https://api.imgur.com/3";

class ImgurJS {
    constructor(type, token) {
        this.authType = type === "client" ? this.authType = "Client-ID" : this.authType = "Bearer";
        this.authToken = token;
    }
    /**
     * Create a new album
     * @param {string} albumTitle The title of the album 
     * @param {string} albumDescription The description of the album
     * @param {string} albumPrivacy The privacy setting (public | hidden | secret)
     * @returns {Promise} Promise contains the album ID and delete hash
     */
    async createAlbum(albumTitle = "", albumDescription = "", albumPrivacy = "hidden") {
        form.append("title", albumTitle);
        form.append("description", albumDescription);
        form.append("privacy", albumPrivacy);

        let res = fetch(`${APIurl}/album`, {
            method: "post",
            body: form,
            headers: { "Authorization": `${this.authType} ${this.authToken}` }
        })
            .then(res => res.json())
            .catch(err => { throw Error("There was an error") })

        return res.then(json => {
            if (json.status !== 200) throw Error(`${json.status} ${json.data.error}`)
            return json
        })
    }
    /**
     * Delete an album
     * @param {string} albumHash The Delete Hash returned when creating an album
     * @returns {Promise} Promise contains success status
     */
    async deleteAlbum(albumHash) {
        if (!albumHash) throw Error("The Album Hash isn't defined");

        let res = fetch(`${APIurl}/album/${albumHash}`, {
            method: "delete",
            headers: { "Authorization": `${this.authType} ${this.authToken}` },
            body: ""
        })
            .then(res => res.json())
            .catch(err => { throw Error("This album doesn't exist\n" + err) })

        return res.then(json => {
            if (json.status !== 200) throw Error(`${json.status} ${json.data.error}`)
            return json
        })
    }
    /**
     * Get an album's info
     * @param {string} albumID The ID returned when creating an album
     * @returns {Promise} Promise contains the album info
     */
    async getAlbum(albumID) {
        if (!albumID) throw Error("The Album ID isn't defined");

        let res = fetch(`${APIurl}/album/${albumID}`, {
            method: "get",
            headers: { "Authorization": `${this.authType} ${this.authToken}` }
        })
            .then(res => res.json())
            .catch(err => { throw Error("This album doesn't exist\n" + err) })

        return res.then(json => {
            if (json.status !== 200) throw Error(`${json.status} ${json.data.error}`)
            return json.data
        })
    }
    /**
     * Upload media to imgur.
     * 
     * For images both direct URLs and file paths work.
     * 
     * For videos only file paths work. The accepted file extensions are:
     * 
     * mp4, webm, mpg, mkv, mov, qt, avi, wmv
     * @param {string} mediaPath The path of the media to upload.
     * @param {string} title The title of the media
     * @param {string} [albumHash] The Delete Hash returned when creating an album
     * @returns {Promise} Promise contains info about the uploaded media. Eg. ID, delete hash, URL
     */
    async uploadMedia(mediaPath, title = "", albumHash) {
        const httpRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi
        const mediaRegex = /^.*\.(mp4|webm|mpg|mkv|mov|qt|avi|wmv)$/gi

        if (!mediaPath) throw Error("The Media Path isn't defined");
        if (albumHash) form.append("album", albumHash);

        if (mediaPath.match(httpRegex)) {
            form.append("image", mediaPath);
            form.append("type", "url")
        } else {
            if (mediaPath.match(mediaRegex)) {
                form.append("video", fs.createReadStream(mediaPath));
            } else {
                form.append("image", fs.createReadStream(mediaPath));
            }
        };
        form.append("title", title);

        let res = fetch(`${APIurl}/upload`, {
            method: "post",
            body: form,
            headers: { "Authorization": `${this.authType} ${this.authToken}` }
        })
            .then(res => res.json())
            .catch(err => { throw Error("There was an error\n" + err) })

        return res.then(json => {
            if (json.status !== 200) throw Error(`${json.status} ${json.data.error}`)
            return json.data
        })
    }
    /**
     * Delete media from imgur
     * @param {string} deleteHash The delete Hash returned when uploading media 
     * @returns {Promise} Promise contains success status
     */
    async deleteMedia(deleteHash) {
        if (!deleteHash) throw Error("The Delete Hash isn't defined");

        let res = fetch(`${APIurl}/image/${deleteHash}`, {
            method: "delete",
            headers: { "Authorization": `${this.authType} ${this.authToken}` },
            body: ""
        })
            .then(res => res.json())
            .catch(err => { throw Error("There was an error\n" + err) })

        return res.then(json => {
            if (json.status !== 200) throw Error(`${json.status} ${json.data.error}`)
            return json.data
        })
    }
};

module.exports = ImgurJS;