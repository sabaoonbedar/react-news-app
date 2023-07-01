FROM node:16-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install -g npm@latest

RUN npm install history

RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build --silent

EXPOSE 80

CMD ["npm", "start"]
