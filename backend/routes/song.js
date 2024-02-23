const express = require('express');
const passport = require('passport');
const Song = require('../Models/Song');
const User = require('../Models/User');
const route = express.Router();

route.post('/create', passport.authenticate("jwt", {session: false}), async(req,res)=>{
    const {name,thumbnail,track} = req.body;
    if(!name || !thumbnail || !track){
        res.status(301).json({err:'require suficient information'});
    }
    const artist = req.user._id;
    const songDetail = {name,thumbnail,track,artist};
    const createSong = await Song.create(songDetail);
    return res.status(201).json({successs: 'Your song is successfully created'});
});
route.get('/get/mysong', passport.authenticate("jwt", {session: false}), async(req,res)=>{
    const song = await Song.find({artist: req.user._id});
    res.status(200).json({data: song});
});
route.get('/get/artist', passport.authenticate('jwt',{session: false}), async(req,res)=>{
    const artistId = req.body;
    const artist = await User.find({_id: artistId});
    if(!artist){
        res.status(301).json({err: "Artist does not exist"});
    }
    const song = await Song.find({artist: artistId});
    res.status(200).json({data: song});
});
route.get('/get/songname', passport.authenticate('jwt',{session: false}), async(req,res)=>{
    const songName = req.body;
    const song  = await Song.find({name: songName});
    res.status(200).json({data: song});
})

module.exports = route;