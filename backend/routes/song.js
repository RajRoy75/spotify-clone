const express = require('express');
const passport = require('passport');
const Song = require('../Models/Song');
const User = require('../Models/User');
const route = express.Router();

// route.post('/create', passport.authenticate("jwt", {session: false}), async(req,res)=>{
//     const {name,thumbnail,track,uid} = req.body;
//     if(!name || !thumbnail || !track){
//         res.status(301).json({err:'require suficient information'});
//     }
//     // const artist = req.user._id;
//     const artist = await User.findOne({uid},'_id');
//     // console.log(artist);
//     const songDetail = {name,thumbnail,track,artist};
//     const createSong = await Song.create(songDetail);
//     return res.status(201).json({data:createSong});
// });
route.post('/create', async(req,res)=>{
        const {name,thumbnail,track,uid} = req.body;
        if(!name || !thumbnail || !track){
            res.status(301).json({err:'require suficient information'});
        }
        // const artist = req.user._id;
        const artist = await User.findOne({uid},'_id');
        // console.log(artist);
        const songDetail = {name,thumbnail,track,artist};
        const createSong = await Song.create(songDetail);
        return res.status(201).json({data:createSong});
    });
route.get('/get/mysong', passport.authenticate("jwt", {session: false}), async(req,res)=>{
    const song = await Song.find({artist: req.user._id}).populate('artist');
    res.status(200).json({data: song});
});
route.get('/get/allsong', async(req,res)=>{
    const song = await Song.find({}).populate('artist');
    res.status(200).json({data:song});
})
route.get('/get/artist/:artist', passport.authenticate('jwt',{session: false}), async(req,res)=>{
    const artistId = req.params.artist;
    const artist = await User.findOne({_id: artistId});
    // it returns [] but ![] = true so that's why it does not show errors and same thing happen with song route.
    if(!artist){
        res.status(301).json({err: "Artist does not exist"});
    }
    const song = await Song.find({artist: artistId});
    res.status(200).json({data: song});
});
route.get('/get/song/:songname', passport.authenticate('jwt',{session: false}), async(req,res)=>{
    const songName = req.params.songname;
    const song  = await Song.findOne({name: songName});
    if(!song){
        res.status(301).json({err:'song not found'});
    }
    res.status(200).json({data: song});
})

module.exports = route;