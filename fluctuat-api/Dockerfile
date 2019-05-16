FROM keymetrics/pm2:8-alpine AS builder
COPY . /fluctuat-api

# deps needs by bcrypt
RUN apk add build-base python

WORKDIR /fluctuat-api

RUN  yarn && \
     yarn build && \
     ## clean devDependencias
     yarn install --production

FROM keymetrics/pm2:8-alpine AS runner
COPY --from=builder /fluctuat-api/node_modules /fluctuat-api/node_modules
COPY --from=builder /fluctuat-api/dist /fluctuat-api/dist
COPY --from=builder /fluctuat-api/ecosystem.config.js /fluctuat-api

WORKDIR /fluctuat-api

EXPOSE 9000

CMD [ "pm2-runtime", "start", "ecosystem.config.js" ]

