# Rocket.Chat.Livechat.Caixa

## Setting up Environment Variables

Add your application configuration to a `.env` file in the root of your project:

```shell
APP_PORT=
JWT_CLOCK_TOLERANCE=
JWT_IGNORE_EXPIRATION=
JWT_ALGORITHMS=
ROCKETCHAT_URL=
PAYLOAD_ROOT_DATA=
```

You may also add `export` in front of each line so you can `source` the file in bash:

```shell
export APP_PORT=
export APP_PORT=
export JWT_IGNORE_EXPIRATION=
export JWT_ALGORITHMS=
export ROCKETCHAT_URL=
export PAYLOAD_ROOT_DATA=
```

``` bash
# install dependencies
npm install

# run server application(default port 8888)
node server.js
```
