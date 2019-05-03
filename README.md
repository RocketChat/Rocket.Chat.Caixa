# Rocket.Chat.Caixa

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

  ```
     curl 
     -X POST \
     -H "Content-type:application/json" \
     http://localhost:8888/api/token \
    -d '{"token": "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJhSm82T3RZMDZkUGJzQzlhN1ppQlJVOVFOb0pNWDlUVHJXUTE3TDgyWk9FIn0.eyJqdGkiOiJjODgyZTk2OS1jY2IyLTRlMDMtYTkyMi00MGYzZWE4MGNjZWMiLCJleHAiOjE1MzcyOTMzODIsIm5iZiI6MCwiaWF0IjoxNTM3MjkzMDgyLCJpc3MiOiJodHRwczovL2xvZ2luLmNhaXhhLmdvdi5ici9hdXRoL3JlYWxtcy9yX2ludGVyX3NpcGVyIiwiYXVkIjoiY2xpLXdlYi1nY2UiLCJzdWIiOiJmOjFiMWUzN2U1LTdhZWMtNDMxZS1iNzM3LTcwMzZlY2ZmNTJhYjo3Njg2NDAxNS04ZDc1LTQzNTAtODA1ZC0xYTFlMzkxY2ZjNGMtMTUyMzkwMzE5MzQxNyIsInR5cCI6IkJlYXJlciIsImF6cCI6ImNsaS13ZWItZ2NlIiwibm9uY2UiOiIxZGVlMDNhNS1hOTczLTQwZGEtODY0ZC00ZGEyOGRlZDFiM2QiLCJhdXRoX3RpbWUiOjE1MzcyOTMwODEsInNlc3Npb25fc3RhdGUiOiJiOGI4OWVlYi0zMGUyLTQxNDQtYTdkNS1iNTA4NzY1OTE1MGMiLCJhY3IiOiIxIiwiY2xpZW50X3Nlc3Npb24iOiI1MDBhYjk1Ny1hZGIwLTQ2M2YtYTdjNS0wOTU1YzM4Y2Q5NjgiLCJhbGxvd2VkLW9yaWdpbnMiOlsiaHR0cHM6Ly9nZXJlbmNpYWRvci5jYWl4YS5nb3YuYnIiLCJodHRwczovL25iY3B1aGp4Z3BqLWdlcmVuY2lhZG9yLmNhaXhhLmdvdi5iciJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6e30sIlNJUEVSIjp7ImNwZiI6IjEwNzQ3NTYxODUiLCJub21lIjoiTFVDQVMgVEVJWEVJUkEgRSBTSUxWQSIsImNvbnRhcyI6WyJVTklEQURFOjQ0NjAsT1BFUkFDQU86MDAwMSxOVU1FUk86MDAwMDAwMDIxMjY2LERWOjEsQ05QSjowMDAwMTA3NDc1NjE4NSxTRUdNRU5UTzpQRixNT0RBTElEQURFX1RJUE86MDAsTU9EQUxJREFERV9DQVRFR09SSUE6MCxGTEFHX1BSRUZFUkVOQ0lBTDpOQU8sRkxBR19QUk9WQV9ERV9WSURBOk5BTyxBU1NJTkFUVVJBX1RJUE86U0lNUExFUyxBU1NJTkFUVVJBX1NJVFVBQ0FPOkFUSVZBIl0sInRva2VuIjoiMDEwNzQ3NTYxODUgICAgICAgICBqS3l4Q3U2eThNcDFSR2pIR1ZDNUZoblhJdFFUMmlUNWhIc1BOSjZ5NGZHakliTWc0SHJuSlZwc3ZuWm4ifSwibmFtZSI6IiIsInByZWZlcnJlZF91c2VybmFtZSI6IjAxMDc0NzU2MTg1In0.FMSFVQtiPnlR3eZeEEodu7xhm8jBFes3fMP6gbzSSfEfqOt__UhCgGCHnDxtQC8mIcDBaC92QtmrqrgOelHvl7y9Pa-T6bCAp-aQ0iHHCbnpMRP0YmF7I9e-krAQlhGaQhgKpyZlQz8EU4LYo4fUkO8KC-TGgEsGKubnI3NlagRkTuqShtyyrsub0xpKjsQvPxiMR4AFK6HfNlb13xngn4ii1FEXROcNWFLzHdyJTnaebTFFzyMDzKvBJlEqvLsLBy7KburuFWo348IHsbCA4U2MmfXcOO0ulOeslngbWiN0MhD2u6DWoNFET359DPndRgkKPq6lKNqFw6Qzuf9zcQ" }'  
  ```
