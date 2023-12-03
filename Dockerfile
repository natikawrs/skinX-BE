FROM node:18-alpine3.18
RUN apk add -qU openssh git
WORKDIR /var/www/nest/skinx-backend
COPY . .
RUN rm yarn.lock
RUN yarn install
RUN yarn run build
CMD [ "yarn", "start:prod" ]