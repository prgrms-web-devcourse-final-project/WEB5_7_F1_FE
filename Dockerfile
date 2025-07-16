FROM node:19.9.0 AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM node:19.9.0

WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev

COPY server.js ./
COPY --from=builder /app/build ./build

CMD ["node", "server.js"]