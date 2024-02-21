const express = require('express');
const User = require('../Models/User');
const bcrypt = require('bcrypt');
const { getToken } = require('../utils/helpers');
const route = express.Router();


route.post('/register', async(req,res)=>{
    // step 1 : get all this details from frontend site
    const {email,userName,firstName,lastName,password} = req.body;

    //step 2 : check user is already exist or not
    //step 2.1 : get email id from DB
    const user = await User.findOne({email: email});
    if(user){
        res.status(404).json({error : "This user is already exist"});
    }
    //step 3 : add user to our DB
    //step 3.1 : Hashing the password
    const hashPassword = await bcrypt.hash(password,10);
    const newUserData = {email,userName,firstName,lastName,password:hashPassword};
    const createNewUser = await User.create(newUserData);
    //step 4: create JWT token
    const token = await getToken(email,createNewUser);
    //step 5: return all the data to the user
    // const returnToUser = createNewUser.toObject();
    const returnToUser = {...createNewUser.toObject(),token};
    delete returnToUser.password;
    res.json(returnToUser);
})
module.exports = route;