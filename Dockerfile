# Faza 1: Build
FROM node:18-alpine AS builder

# Setează directorul de lucru
WORKDIR /app

# Copiază package.json și package-lock.json
COPY package*.json ./

# Instalează dependențele
RUN npm install

# Copiază restul aplicației
COPY . .

# Rulează comanda de build NestJS
RUN npm run build

# Faza 2: Runner
FROM node:18-alpine

# Setează directorul de lucru
WORKDIR /app

# Copiază aplicația construită din faza de build
COPY --from=builder /app ./

# Instalează doar dependențele necesare pentru producție
RUN npm ci --omit=dev

# Expune portul 5000 (sau portul pe care rulează aplicația ta)
EXPOSE 5000

# Rulează aplicația
CMD ["npm", "run", "start:prod"]
