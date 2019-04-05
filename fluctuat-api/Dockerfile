FROM keymetrics/pm2:8-alpine
COPY . /fluctuat-api

# deps needs by bcrypt
RUN apk add build-base python

WORKDIR /fluctuat-api

RUN  yarn && \
     yarn test:ci && \
     yarn lint && \
     yarn build

EXPOSE 9000

CMD [ "pm2-runtime", "start", "ecosystem.config.js" ]

