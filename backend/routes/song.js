const express = require('express');
const passport = require('passport');
const Song = require('../Models/Song');
const route = express.Router();

route.post('/create', passport.authenticate('user'), async(req,res)=>{
    const {name,thumbnail,track} = req.body;
    if(!name || !thumbnail || !track){
        res.status(301).json({err:'require suficient information'});
    }
    const artist = req.user._id;
    const songDetail = {name,thumbnail,track,artist};
    const createSong = await Song.create(songDetail);
    return res.status(201).json({successs: 'Your song is successfully created'},createSong);
})

module.exports = route;