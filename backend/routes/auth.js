const express = require('express');
const User = require('../Models/User');
const bcrypt = require('bcrypt');
const { getToken } = require('../utils/helpers');
const route = express.Router();
const {authMiddleware} = require('../utils/authMiddleware');



route.post('/register', async (req, res) => {
    // step 1 : get all this details from frontend site
    const { email, userName, firstName, lastName, password, uid } = req.body;
    //step 2 : check user is already exist or not
    //step 2.1 : get email id from DB
    const user = await User.findOne({ email: email });
    if (user) {
        res.status(404).json({ error: "This user is already exist" });
    }
    //step 3 : add user to our DB
    //step 3.1 : Hashing the password
    const hashPassword = await bcrypt.hash(password, 10);
    const newUserData = { email, userName, firstName, lastName, password: hashPassword, uid };
    const createNewUser = await User.create(newUserData);
    //step 4: create JWT token
    const token = await getToken(email, createNewUser);
    //step 5: return all the data to the user
    // const returnToUser = createNewUser.toObject();
    const returnToUser = { ...createNewUser.toObject(), token };
    delete returnToUser.password;
    res.json(returnToUser);
});
route.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if (!user) {
            res.status(404).json({ error: 'Invalid login credential' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(404).json({ error: 'invalid login credential' });
        }
        const token = await getToken(email, user);
        //step 5: return all the data to the user
        // const returnToUser = createNewUser.toObject();
        const returnToUser = { ...user.toObject(), token };
        delete returnToUser.password;
        res.json(returnToUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Enternal server error" })
    }


})

route.get('/protected', authMiddleware, (req, res) => {
    res.json({ message: 'This is a protected route', user: req.user });
  });

route.get('/user/:uid', async(req,res)=>{
    const {uid} = req.params;
    try {
        const response = await User.findOne({uid:uid});
        if(!response){
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(response);
    } catch (error) {
        console.log(error);
    }
})


module.exports = route;