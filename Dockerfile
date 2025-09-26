# ---- Stage 1: Build ----
FROM node:20-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# Lệnh này chạy "prisma generate && nest build"
RUN npm run build 


# ----------------------------------------------------------------------------------
# ---- Stage 2: Production (Đã sửa) ----
# ----------------------------------------------------------------------------------
FROM node:20-alpine

WORKDIR /app

# 1. Copy file package.json và package-lock.json
COPY package*.json ./

# 2. Chỉ cài đặt production dependencies
RUN npm install --omit=dev

# 3. Copy code đã được build
COPY --from=builder /app/dist ./dist

# 4. BƯỚC QUAN TRỌNG: SAO CHÉP THƯ MỤC PRISMA CLIENT ĐÃ GENERATE
# Thư mục này chứa các file cần thiết để @prisma/client hoạt động
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

# 5. BƯỚC QUAN TRỌNG KHÁC: SAO CHÉP file schema.prisma (hoặc thư mục prisma)
# Prisma Client cần file này để biết cấu hình của nó
COPY --from=builder /app/prisma ./prisma

RUN npx prisma db push --force && npm run seed 
# Lệnh để khởi động ứng dụng
CMD ["node", "dist/src/main.js"]