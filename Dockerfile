# ---- Stage 1: Build ----
FROM node:20-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# Lệnh này chạy "prisma generate && nest build"
RUN npm run build 


# ----------------------------------------------------------------------------------
# ---- Stage 2: Production ----
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

# ----------------- CÁC THAY ĐỔI TẠI ĐÂY -----------------
# THAY THẾ lệnh RUN cũ (chạy db push/seed)
# bằng cách COPY file start.sh vào container
COPY start.sh .

# Cấp quyền thực thi cho file start.sh
RUN chmod +x start.sh

# THAY THẾ lệnh CMD cũ (chạy node)
# bằng lệnh chạy script start.sh
CMD ["./start.sh"]