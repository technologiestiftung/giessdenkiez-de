FROM node:14
WORKDIR /usr/src/app
COPY package*.json ./
RUN rm package-lock.json && npm install
COPY . .
RUN npm run build
CMD [ "npm", "run", "start" ]