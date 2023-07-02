FROM node:18

# Create app directory
WORKDIR /usr/src/golestan

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --omit=dev

# Bundle app source
COPY app app
COPY .env .env

EXPOSE 8090
CMD [ "node", "app/app.js" ]