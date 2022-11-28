# ⚡️ Next Test API Routes

[![Tests](https://github.com/shahradelahi/next-test-api-routes/actions/workflows/tests.yml/badge.svg)](https://github.com/shahradelahi/next-test-api-routes/actions/workflows/tests.yml)
[![npm version](https://badge.fury.io/js/next-test-api-routes.svg)](https://badge.fury.io/js/next-test-api-routes)
[![npm](https://img.shields.io/npm/dt/next-test-api-routes)](https://www.npmjs.com/package/next-test-api-routes)

## Installation

```bash
npm install --save-dev next-test-api-routes 
```

## Usage

```js
import {createMocks, parseResponse} from 'next-test-api-routes'

const route = require('./api/hello')

describe('api/hello', () => {
   it('should return a 200 status code', async () => {
      const {req, res} = createMocks({
         method: 'GET',
      })

      const resp = parseResponse(await route(req, res))

      expect(res.statusCode).toBe(200)
   })

   it('should return a JSON object', async () => {
      const {req, res} = createMocks({
         method: 'POST',
         body: {
            name: 'John Doe',
         },
      })

      const resp = parseResponse(await route(req, res))

      expect(resp.json().message).toBe('Hello John Doe')
   })
})
```

## Methods

### createMocks

Creates a mock request and response object.

#### Parameters

-  `options` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** 
   -  `options.method` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** (optional, default `'GET'`)
   -  `options.body` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)**  (optional, default `undefined`)
   -  `options.query` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** (optional, default `{}`)
   -  `options.headers` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** (optional, default `{}`)
   - `options.cookies` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** (optional, default `{}`)
   - `options.url` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** (optional, default `/`)
   - `options.params` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)**  (optional, default `{}`)

#### Examples

```js
const {req, res} = createMocks({
   method: 'GET',
    body: {
        name: 'John Doe',
    },
    query: {
        page: 1,
    }
})
```

### parseResponse

Parses the response object from the route handler.

#### Parameters

-  `response` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)**

#### Returns

- `response` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)**
- `response.json` **[Function](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function)** Returns the parsed JSON object.
- `response.body` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The response body as a string.
- `response.headers` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** The response headers.
- `response.statusCode` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** The response status code.

#### Examples

```js
const {req, res} = createMocks({
   method: 'GET',
})

const resp = parseResponse(await route(req, res))

expect(resp.json().message).toBe('Hello World')
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
