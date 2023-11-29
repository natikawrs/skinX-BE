FROM node
WORKDIR /app
COPY . .
RUN rm yarn.lock
RUN yarn install
# RUN yarn run build
# RUN yarn run generate
EXPOSE 3000/tcp
CMD [ "yarn", "start:app" ]