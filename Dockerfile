# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app

# Copy package.json và package-lock.json/yarn.lock
COPY package*.json ./

# Cài dependencies
RUN npm install

# Copy toàn bộ source code
COPY . .

# Prisma generate
RUN npx prisma generate

# Build NestJS
RUN npm run build

# Stage 2: Production image
FROM node:20-alpine
WORKDIR /app

# Chỉ cài production dependencies
COPY package*.json ./
RUN npm install --only=production

# Copy folder dist từ builder
COPY --from=builder /app/dist ./dist
# Copy prisma folder nếu runtime cần
COPY --from=builder /app/prisma ./prisma

EXPOSE 3000

# Chạy app
CMD ["node", "dist/main.js"]
