# Use the official Node.js runtime as the base image
FROM node:20.16.0 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Use Nginx as the production server
FROM nginx:stable-alpine3.20-perl
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 for the Nginx server
EXPOSE 80

# copy env.sh to container
WORKDIR /usr/share/nginx/html
COPY ./env.sh .

# Adicionar o bash
RUN apk add --no-cache bash

# Tornar nosso script do shell executável
RUN chmod +x env.sh

CMD ["/bin/sh", "-c", "/usr/share/nginx/html/env.sh .env && nginx -g \"daemon off;\""]