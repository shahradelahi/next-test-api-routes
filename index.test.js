const {describe, expect, test} = require('@jest/globals');
const {createMocks, parseResponse} = require('./index');

const helloRoute = async (req, res) => res.status(200).json({message: 'Hello World'});

const echoRoute = async (req, res) => {
   if (req.method !== 'POST') {
      return res.status(200).json({error: 'Only POST requests are allowed'});
   }
   if (!req.body.message) {
      return res.status(200).json({error: 'No message provided'});
   }
   return res.status(200).json({message: req.body.message});
}

describe("Test the hello route", () => {
   test("It should respond with a 200 status code", async () => {
      const {req, res} = createMocks({
         method: 'GET',
         url: '/hello',
      });
      const resp = parseResponse(await helloRoute(req, res));
      expect(resp.statusCode).toBe(200);
   });
   test("It should respond with a JSON object", async () => {
      const {req, res} = createMocks({
         method: 'GET',
         url: '/hello',
      });
      const resp = parseResponse(await helloRoute(req, res));
      expect(resp.headers['content-type']).toBe('application/json');
   });
   test("It should respond with a message", async () => {
      const {req, res} = createMocks({
         method: 'GET',
         url: '/hello',
      });
      const resp = parseResponse(await helloRoute(req, res));
      expect(resp.json().message).toBe('Hello World');
   });
});

describe("Test the echo route", () => {
   test("It should send an error if the method is not POST", async () => {
      const {req, res} = createMocks({
         method: 'GET',
         url: '/echo',
      });
      const resp = parseResponse(await echoRoute(req, res));
      expect(resp.json().error).toBe('Only POST requests are allowed');
   });
   test("It should send an error if no message is provided", async () => {
      const {req, res} = createMocks({
         method: 'POST',
         url: '/echo',
      });
      const resp = parseResponse(await echoRoute(req, res));
      expect(resp.json().error).toBe('No message provided');
   });
   test("It should send the message if it is provided", async () => {
      const {req, res} = createMocks({
         method: 'POST',
         url: '/echo',
         body: {
            message: 'Hello World',
         },
      });
      const resp = parseResponse(await echoRoute(req, res));
      expect(resp.json().message).toBe('Hello World');
   });
});
