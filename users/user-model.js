//import express
const express = require('express');

//import database object
const db = require('../database/dbConfig.js');

//export functions
module.exports = {
    find,
    findByUserName,
    findById,    
    add,   

};

//define CRUD methods
function find(){

    return db('users');
}

function findByUserName({ username }){

    return db('users')
    .where({ 'users.username': username})
    .first();

}

function findById(id){

    return db('users')
    .where({ 'users.id': id })
    .first();    
}


function add({ username, password }){

    return db('users')
    .insert({ username, password })
    .then ( ([id]) => {
        return findById(id);
    })
}

