FROM node:alpine AS builder

WORKDIR /orokii

COPY . .

RUN npm i && npm build


#Install nginx

FROM nginx:alpine

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=builder /orokii/dist/client .

ENTRYPOINT [ "nginx","-g" ,"daemon off"]