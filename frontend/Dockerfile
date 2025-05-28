# build step
FROM node:alpine 
WORKDIR /myapp
COPY package.json ./
#COPY . .
RUN npm install
COPY . ./
CMD [ "npm","start" ]
