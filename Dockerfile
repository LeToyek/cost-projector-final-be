FROM node:14

ENV PORT=$PORT

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# RUN npm run start

EXPOSE $PORT

CMD ["npm", "run start"]
