const {createMocks} = require('node-mocks-http');

/**
 * Parse the response
 *
 * @param {Object} response
 * @return {{headers: Headers, body: any, statusCode: number}}
 */
function parseResponse(response) {
   const {statusCode, _getHeaders, _getData} = response;
   return {
      statusCode,
      headers: _getHeaders(),
      body: _getData(),
      json: () => JSON.parse(_getData()),
   };
}

module.exports = {
   createMocks,
   parseResponse,
};
