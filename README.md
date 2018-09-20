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
