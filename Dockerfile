# Etap 1: Budowanie aplikacji
FROM node:20.10.0-alpine AS builder
WORKDIR /app

# Kopiowanie zależności
COPY package.json package-lock.json ./
RUN npm install

# Kopiowanie kodu + zmiennych środowiskowych
COPY . .
COPY .env .env  

# Budowanie aplikacji
RUN npm run build

# Etap 2: Serwowanie statycznych plików
FROM node:20.10.0-alpine
WORKDIR /app
RUN npm install -g serve
COPY --from=builder /app/build ./build
EXPOSE 3000
CMD ["serve", "-s", "build", "-l", "3000"]
