FROM node:6

# Create app directory
RUN mkdir -p /user/src/app
WORKDIR /user/src/app

# Install app dependencies
COPY package.json /user/src/app/

RUN npm install

# Bundle app source
COPY . /user/src/app/
RUN npm run build-ts

EXPOSE 3000

CMD [ "npm", "start" ]
