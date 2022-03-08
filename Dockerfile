FROM node:lts-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN apk add --update python3 make g++\
   && rm -rf /var/cache/apk/*
RUN yarn && mv node_modules ../
COPY . .
EXPOSE 6000
RUN chown -R node /usr/src/app
USER node
CMD ["npm", "start"]
