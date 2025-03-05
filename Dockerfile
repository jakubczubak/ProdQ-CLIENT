# FROM node:20.10.0-alpine

# WORKDIR /app

# COPY package.json .

# RUN npm install

# COPY . .

# EXPOSE 3000

# CMD ["npm", "start"]


# Etap 1: Budowanie aplikacji
FROM node:20.10.0-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Etap 2: Serwowanie statycznych plików
FROM node:20.10.0-alpine
WORKDIR /app
RUN npm install -g serve
COPY --from=builder /app/build ./build
EXPOSE 3000
CMD ["serve", "-s", "build", "-l", "3000"]