module.exports = {

    //secret should be in an environment variable, shouldn't be in the souce code
    jwtSecret: process.env.JWT_SECRET || 'keep it a secret!'
}