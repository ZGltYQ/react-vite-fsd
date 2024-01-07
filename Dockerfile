FROM node:18.18-alpine as BUILDER

WORKDIR /ui

COPY public public
COPY src src
COPY etc etc
COPY index.html index.html
COPY *.json ./
COPY *.ts ./

RUN npm ci
RUN npm run build

FROM nginx:alpine

WORKDIR /ui

COPY etc/nginx.conf.sample /etc/nginx/conf.d/default.conf
COPY --from=BUILDER /ui/dist /ui/dist

CMD exec /usr/sbin/nginx -g 'daemon off;'