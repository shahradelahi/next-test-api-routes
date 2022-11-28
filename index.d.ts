declare const createMocks: any;
/**
 * Parse the response
 *
 * @param {Object} response
 * @return {{headers: Headers, body: any, statusCode: number}}
 */
declare function parseResponse(response: any): {
   statusCode: any;
   headers: any;
   body: any;
   json: () => any;
};
