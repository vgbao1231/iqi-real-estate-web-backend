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

# ----------------- THAY ĐỔI CẦN THIẾT -----------------

# SỬ DỤNG SHELL FORM: Chạy các lệnh DB, sau đó khởi động ứng dụng.
CMD npx prisma migrate deploy && npm run start:prod