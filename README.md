# Rocket.Chat.Livechat.Caixa

## Setting up Environment Variables

Add your application configuration to a `.env` file in the root of your project:

```shell
APP_PORT=8888
JWT_CLOCK_TOLERANCE=10
JWT_IGNORE_EXPIRATION=false
JWT_ALGORITHMS=['RS256']
ROCKETCHAT_URL='http://your-own-rocket-chat:3000'
PAYLOAD_ROOT_DATA='SIPER'
```

You may also add Environment Variables using the `export` approach:

```shell
export APP_PORT=8888
export JWT_CLOCK_TOLERANCE=10
export JWT_IGNORE_EXPIRATION=false
export JWT_ALGORITHMS=['RS256']
export ROCKETCHAT_URL='http://your-own-rocket-chat:3000'
export PAYLOAD_ROOT_DATA='SIPER'
```

``` bash
# install dependencies
npm install

# run server application(default port 8888)
node server.js
```

** Authenticate a livechat user through a JWT Token **
----
  Returns the json data about the result of the request.

* **URL**

  /api/token

* **Method:**

  `POST`

* **Body Params**

   **Required:**
   
  `token=a-valid-jwt-decoded`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ "success": true, "_id": "zmmook48jPiMewb8i", "token": "01074756185" }`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ "success": false, message : "Error validating JWT." }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ "success": false, message : "Error decoding JWT. Field 'iss' is missing." }`

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/users/1",
      dataType: "json",
      type : "GET",
      success : function(r) {
        console.log(r);
      }
    });
  ```
