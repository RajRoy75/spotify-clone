const mongoose = require('mongoose');
//step 1: import mongoose
//step 2: create a schema (structure of a User)
//step 3: create a model

const User = new mongoose.Schema({
    firstName: {
        type:String,
        required: true
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    likedSong: {
        type: String,
        //we change it to array later
        default:''
    },
    likedPlaylist: {
        //we change it to array later
        type: String,
        default: ''
    },
    subscribedArtist: {
        //we change it to array later
        type: String,
        default: ''
    }
});
const UserModel = mongoose.model('User',User);
module.exports = UserModel;