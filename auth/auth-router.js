//create auth router
const router = require('express').Router();


const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//import data access file
const authDB = require('../users/user-model.js');

//import secrets
const secrets = require ('../config/secrets.js');

router.post('/register', (req, res) => {
  // implement registration
  //destructure the info received from req.body
  const { username, password } = req.body;

  //hash the password. 8 indicates hashing rounds (2^8) and how we slow down attackers trying to pregenerate hashes
  //Having an algorithm that hashes the information multiple times (rounds) means an attacker needs to 
  //have the hash, know the algorithm used, and how many rounds were used to generate the hash in the first place.
  const hash = bcrypt.hashSync(password, 8);

  authDB.add({ username, password: hash })
  .then(user => {

     //send a token when the user registers so they can log in automatically
     res.status(200).json(user);
  })
  .catch(error => {
      console.log("registration error", error);
      res.status(500).json({ error: 'There was a registration error.'})
  })
});

router.post('/login', (req, res) => {
  // implement login
  const { username, password } = req.body;    

    authDB.findByUserName({ username })    
    .then(user => {             
        //check that passwords match
        if(user && bcrypt.compareSync(password, user.password)){

            //generate token when we log in
            const token = generateToken(user);
            
            //pass token along with response body
            res.status(200).json({ 
                message: `Welcome ${user.username}!`, 
                 user : {
                        id: user.id,                        
                        username: user.username,
                        password: user.password                        
                },
                token,  
                
             });
        }
        else {
            // we will return 401 if the password or username are invalid
            // we don't want to let attackers know when they have a good username
            res.status(401).json({ message: 'Invalid Credentials!'});
        }
    })
    .catch(error => {
        console.log("log in error", error);
        res.status(500).json({ error: 'There was an error signing the user into the database.'});
    })
});

//could be in a separate file
function generateToken(user){

    //information about the payload, info we want to store along with that token
    //put info front end might need like user role(admin/reg user), id, username, etc.
    const payload = {
        username: user.username,
        id: user.id,      

    };

    //determines when token is going to expire
    const options = {
        expiresIn: '1d'
    };

    //calls jwt's sign method
    //secret is used to protect the token
    //library will produce a signature based on the secret you give it
    //secrets.jwtSecret is referring to the imported jwtSecret object from the config/secrets.js file
    return jwt.sign(payload, secrets.jwtSecret, options);

}


module.exports = router;