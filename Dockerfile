FROM node:22.14.0-alpine

WORKDIR app

COPY package*.json .

RUN npm ci

COPY . .

RUN npm run build

RUN npm run prisma:generate

CMD ["npm", "run", "start"]