/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/

/*module.exports = (req, res, next) => {
    res.status(401).json({ you: 'shall not pass!' });
};*/

//server uses this middleware to verify the user is logged in before providing access to any of our endpoints
//import json web token
const jwt = require('jsonwebtoken'); //give us the ability to verify the token

const secrets = require('../config/secrets.js');

function authenticate (req, res, next){

    //most companies are going to use a specific header called authorization to verify token
    //generally we want to include the tokens inside the headers
    //we don't want to send bodies with get requests
    const token = req.headers.authorization;
    
    //check to see if user has a valid token along with their request
    //if no valid token was provided
    if(token){
        //verify that token hasn't been tampered with or that it hasn't expired
        //once you verify token the callback function will be called
        jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
            if(err){
                //means token expired or is invalid
                res.status(401).json({ message: 'Authorization token is not valid!'});
            }
            else {
                //means token is good
                //the decoded web token has all the information we put inside the payload
                //in the generateToken function in authRouter.js -- eg. username and id
                //grab the username from the payload
                //req.user is going to be sent on the request
                //so req.user.username in the userRouter will produce the decodedToken.username
                //****Luis used this in lecture => req.username = decodedToken.username;
                req.user = {username: decodedToken.username};
                                
                next();

                /*****the decoded web token has all the information we put inside the payload*****
                const payload = {
                    username: user.username,
                    id: user.id,
                };*/
            }
        });

        
    }       
    else {
        res.status(401).json({ message: 'No authorization token provided!'});
       
    }

}

//export the restricted function
module.exports = authenticate;
