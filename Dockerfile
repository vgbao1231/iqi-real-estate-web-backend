# ---- Stage 1: Build ----
FROM node:20-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build 


# ----------------------------------------------------------------------------------
# ---- Stage 2: Production (Đã sửa) ----
# ----------------------------------------------------------------------------------
FROM node:20-alpine

WORKDIR /app

# 1. Copy dependencies
COPY package*.json ./
RUN npm install --omit=dev

# 2. Copy code và Prisma files
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/prisma ./prisma

# SỬ DỤNG SHELL FORM: Chạy các lệnh DB, sau đó khởi động ứng dụng.
CMD npx prisma migrate deploy && npm run start:prod

# ----------------------------------------------------------------------------------
# ---- Stage 3: Development (Chạy Nodemon) ----
# ----------------------------------------------------------------------------------
FROM node:20-alpine AS development
WORKDIR /app
# 1. Copy TẤT CẢ node_modules từ Stage 1 (bao gồm nodemon)
COPY --from=builder /app/node_modules ./node_modules
# 2. Copy source code (chưa build)
COPY . .

# Chỉ định lệnh chạy phát triển (sử dụng nodemon)
CMD npm run start:dev