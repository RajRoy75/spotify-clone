const express  = require('express');
const passport  = require('passport');
const Playlist = require('../Models/Playlist');
const User = require('../Models/User');
const Song = require('../Models/Song');
const route = express.Router();

route.post('/create', async(req,res)=>{
    // const currentUser = req.user;
    const {name, thumbnail, uid, songs} = req.body;
    if(!name || !thumbnail || !songs || !uid){
        res.status(301).json({err:'require suficient information'});
    }
    const owner = await User.findOne({uid},'_id');
    const playlistData = {name, thumbnail, songs, owner};
    const playlist = await Playlist.create(playlistData);
    res.status(200).json({data: playlist});

});
route.get('/get/playlist/:playlistId', async(req,res)=>{
    const playlistId = req.params.playlistId;
    const playlist = await Playlist.findOne({_id: playlistId}).populate([
        { path: 'songs', populate: { path: 'artist'} },
        { path: 'owner'},
      ]);
    if(!playlist){
        res.status(301).json({err: "Invalid playlist Id"});
    }
    res.status(200).json({data: playlist});
});
route.get('/get/artist/:artistUid', async(req,res)=>{
    const uid = req.params.artistUid;
    const artistId = await User.findOne({uid}, '_id');
    if(!artistId){
        res.status(301).json({err: "Artist doesn't exist"})
    }
    const playlist = await Playlist.find({owner:artistId}).populate('owner');
    if(!playlist){
        res.status(301).json({err: "Invalid playlist Id"});
    }
    res.status(200).json({data: playlist});
});
route.post('/add/song', async(req,res)=>{
    const {playlistId, songId,uid} = req.body;
    const currentUser  = await User.findOne({uid:uid});
    const playlist = await Playlist.findOne({_id: playlistId});
    if(!playlist){
        res.status(301).json({err: "Playlist not exist"});
    };
    if(!playlist.owner.equals(currentUser._id) && !playlist.collaborators.includes(currentUser._id)){
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

route.post('/remove/song', async(req,res)=>{
const { playlistId, songId, uid } = req.body;

  try {
    // Find the current user
    const currentUser = await User.findOne({ uid: uid });
    if (!currentUser) {
      return res.status(404).json({ err: "User not found" });
    }

    // Find the playlist
    const playlist = await Playlist.findOne({ _id: playlistId });
    if (!playlist) {
      return res.status(404).json({ err: "Playlist does not exist" });
    }

    // Check if user is the owner or a collaborator
    if (!playlist.owner.equals(currentUser._id) && !playlist.collaborators.includes(currentUser._id)) {
      return res.status(403).json({ err: "Not allowed" });
    }

    // Check if the song exists
    const song = await Song.findOne({ _id: songId });
    if (!song) {
      return res.status(404).json({ err: "Song does not exist" });
    }

    // Remove the song if it exists in the playlist
    if (!playlist.songs.includes(songId)) {
      return res.status(400).json({ err: "Song not in playlist" });
    }

    // Remove the song using $pull
    await Playlist.updateOne(
      { _id: playlistId },
      { $pull: { songs: songId } }
    );
    return res.status(200).json({ message: "Song removed successfully" });
    
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ err: "Internal server error" });
  }    
})


route.get('/check-ownership', async(req,res)=>{
  const {playlistId,uid} = req.query;
  try {
    const artistId = await User.findOne({uid}, '_id');
    const playlistOwner = await Playlist.findOne({_id:playlistId},'owner');

    if(!playlistOwner){
      res.status(404).json({message:'Playlist not found'});
    }

    const isOwner = playlistOwner.owner.toString() === artistId._id.toString();
    res.status(200).json({isOwner});

  } catch (error) {
    console.error('error : ',error);
    res.status(500).json({message:'Internal server error'});
  }

})

module.exports = route;
