const express  = require('express');
const passport  = require('passport');
const Playlist = require('../Models/Playlist');
const User = require('../Models/User');
const Song = require('../Models/Song');
const route = express.Router();

route.post('/create', passport.authenticate('jwt', {session: false}), async(req,res)=>{
    const currentUser = req.user;
    const {name, thumbnail, songs} = req.body;
    if(!name || !thumbnail || !songs){
        res.status(301).json({err:'require suficient information'});
    }
    const playlistData = {name, thumbnail, songs, owner:currentUser._id, collaborators:[]};
    const playlist = await Playlist.create(playlistData);
    res.status(200).json({data: playlist});

});
route.get('/get/playlist/:playlistId', passport.authenticate('jwt', {session: false}), async(req,res)=>{
    const playlistId = req.params.playlistId;
    const playlist = await Playlist.findOne({_id: playlistId});
    if(!playlist){
        res.status(301).json({err: "Invalid playlist Id"});
    }
    res.status(200).json({data: playlist});
});
route.get('/get/artist/:artistId', passport.authenticate('jwt', {session: false}), async(req,res)=>{
    const artistId = req.params.artistId;
    const artist = await User.findOne({_id:artistId});
    if(!artist){
        res.status(301).json({err: "Artist doesn't exist"})
    }
    const playlist = await Playlist.find({owner:artistId});
    if(!playlist){
        res.status(301).json({err: "Invalid playlist Id"});
    }
    res.status(200).json({data: playlist});
});
route.post('/add/song', passport.authenticate('jwt', {session: false}), async(req,res)=>{
    const currentUser  = req.user;
    const {playlistId, songId} = req.body;
    const playlist = await Playlist.findOne({_id: playlistId});
    if(!playlist){
        res.status(301).json({err: "Playlist not exist"});
    };
    if(playlist.owner != currentUser._id && !playlist.collaborators.includes(currentUser._id)){
        res.status(301).json({err: "Not allowed"})
    };
    const song = await Song.findOne({_id: songId});
    if(!song){
        res.status(301).json({err: "song not exist"});
    };
    playlist.songs.push(songId);
    await playlist.save();
    return res.status(200).json({data: playlist});
})

module.exports = route;