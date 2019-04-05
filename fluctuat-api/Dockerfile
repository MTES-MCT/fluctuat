FROM keymetrics/pm2:8-alpine as builder
COPY . /fluctuat-api

# deps needs by bcrypt
RUN apk add build-base python

WORKDIR /fluctuat-api

RUN  yarn && \
     yarn build && \
     ## clean devDependencias
     yarn install --production

FROM keymetrics/pm2:8-alpine as runner
COPY . /fluctuat-api
COPY --from=builder /fluctuat-api/node_modules /fluctuat-api/node_modules
COPY --from=builder /fluctuat-api/dist /fluctuat-api/dist

WORKDIR /fluctuat-api

EXPOSE 9000

CMD [ "pm2-runtime", "start", "ecosystem.config.js" ]

