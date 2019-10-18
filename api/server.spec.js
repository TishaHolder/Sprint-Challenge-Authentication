/*
- when making a GET to the `/` endpoint 
  the API should respond with status code 200 
  and the following JSON object: `{ api: 'running' }`.
*/
const request = require('supertest'); // calling it "request" is a common practice

const server = require('./server.js');//this is our first red, file doesn't exist yet

describe('server.js', () => {
  // http calls made with supertest return promises, we can use async/await if desired
  describe('GET /', () => {
    //returns a promise
    it('returns 200 OK', () => {
        //make a GET request to the / endpoint on the server
        //must return the promise if you don't have async or await or you will get a false positive
        return request(server)
        .get('/')
        .then(res => {
            //assert that we get a http status code 200
            expect(res.status).toBe(200);
        });    
    });

    //should return json
    it('should return JSON', async () => {
      //should return JSON
      const res = await request(server).get('/');

      //toMatch uses a regular extension to check the value
      expect(res.type).toMatch(/json/i); //i means ignore case

    });   

    //using async and await
    it("should return {api: 'running'}", async ()=> {
        const res = await request(server).get('/');

        expect(res.body.api).toBe('running');
        expect(res.body).toEqual({ api: 'running' });
    });

  });

});
