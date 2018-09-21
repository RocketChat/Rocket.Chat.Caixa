FROM node:8.12-alpine

USER root

COPY ["livechatProxy.js", "server.js","package.json","/root/"]

RUN cd /root && \
    npm install

ENTRYPOINT [ "node", "/root/server.js" ]
