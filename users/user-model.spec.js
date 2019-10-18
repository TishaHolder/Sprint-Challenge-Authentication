const server = require('../api/server.js');
const request = require('supertest');
const UserModel = require('./user-model.js');
const db = require('../database/dbConfig.js');

describe('users model', () => {

    //there is a beforeEach(), beforeAll(), afterEach(), and afterAll()

    //clean out users table before each test runs
    beforeEach(async () => {
        await db('users').truncate();
    })

    it('should set environment to testing', () => {
        expect(process.env.DB_ENV).toBe('testing');

    })
   
});


//**************************************TESTING ADD/REGISTER*******************************/
describe('add()', () => {

    //clean out users table before delete tests run
    beforeEach(async () => {
        await db('users').truncate();
    })

    //*****************TEST ONE**************************/
    it('should insert/register users into the database', async () => {
        //insert a record
        await UserModel.add({                 
                username: 'tishay2', 
                password: 'test' 
        });

        //select all records from the users table and assign the results to usermodel
        let usermodel = await db('users');

         //assert the record was inserted and the returned array has a length = 1
         expect(usermodel).toHaveLength(1);
    })

    //*****************TEST TWO**************************/
    // note we're checking one user at a time
    it('should insert the provided user into the db', async () => {
        let user = await UserModel.add({             
            username: 'eric', 
            password: 'test' 
        });    

    expect(user.username).toBe('eric');
  
       //note how we're reusing the user variable
        user = await UserModel.add({             
            username: 'pam', 
            password: 'test' 
        });

        expect(user.username).toBe('pam');

    })

});

//***************************************TESTING LOGIN****************************************
describe('findByUsername()', () => {   
    
    
    //*****************TEST ONE**************************/
    it('should find the provided user into the database', async () => {
        
        let user = await UserModel.findByUserName({                  
                username: 'pam'                
        });

        //assert the username was found
         expect(user.username).toBe('pam');
    })


    //*****************TEST TWO**************************/
    //should return json
    it('logging in with a certain username should return the length of the username', async () => {
        
        let user = await UserModel.findByUserName({                  
            username: 'pam'
            
        });  
        
         //assert the user successfully logged in and returns the length of their username
         expect(user.username).toHaveLength(3);
  
      });


});
