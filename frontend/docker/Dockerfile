FROM node:current-bullseye

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json package-lock.json .
RUN npm install

COPY . .

CMD ["npm", "run", "dev"]
