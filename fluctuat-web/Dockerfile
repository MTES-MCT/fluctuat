FROM node:10-alpine AS builder
COPY . /fluctuat-web
WORKDIR /fluctuat-web

RUN  yarn && \
     yarn test:ci && \
     yarn lint && \
     yarn build --prod

FROM nginx:alpine as runner
RUN apk add --no-cache curl
COPY --from=builder /fluctuat-web/dist /usr/share/nginx/html
COPY ./nginx/fluctuat.conf /etc/nginx/conf.d/flucuat.conf

EXPOSE 4200
CMD ["nginx", "-g", "daemon off;"]
