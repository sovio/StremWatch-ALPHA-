FROM node:16.16.0

WORKDIR /app_BackEnd

COPY package.json .

RUN npm install

COPY . .


EXPOSE 4000


CMD ["npm", "start"]