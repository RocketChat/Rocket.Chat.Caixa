# Rocket.Chat.Livechat.Caixa

## Setting up Environment Variables

Add your application configuration to a `.env` file in the root of your project:

```shell
APP_PORT=YOURS3BUCKET
JWT_CLOCK_TOLERANCE=YOURSECRETKEYGOESHERE
JWT_IGNORE_EXPIRATION=YOURSECRETKEYGOESHERE
JWT_ALGORITHMS=YOURSECRETKEYGOESHERE
```

You may also add `export` in front of each line so you can `source` the file in bash:

```shell
export S3_BUCKET=YOURS3BUCKET
export SECRET_KEY=YOURSECRETKEYGOESHERE
```

``` bash
# install dependencies
npm install

# run server application(default port 8888)
node server.js
```
