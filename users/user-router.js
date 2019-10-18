//import express
const express = require('express');

//import data access file
const userDB = require('./user-model.js');

//create router
const userRouter = express.Router();

//end points beginning with /api/users
//returns all users
userRouter.get('/', (req, res) => {

    userDB.find()
    .then(users => {
        //***Luis used this in lecture, see restrictedMiddleware.js line 31 => res.json({ loggedInUser: req.username, users});
        res.status(200).json({ users, loggedInUser: req.user.username });
        
    })
    .catch(error => {
        console.log("retrieve users error", error);
        res.status(500).json({ error: 'There was an error retrieving the users from the database.'});
    })
})


//export router
module.exports = userRouter;