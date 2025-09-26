#!/bin/bash
# start.sh
# Script này chạy khi container khởi động (có DATABASE_URL)

echo "--- Running Prisma DB Initialization ---"

# 1. Chạy db push để tạo Schema
# Sử dụng --accept-data-loss vì đây là môi trường phát triển/staging
npx prisma db push --force-reset

# 2. Chạy seed để đổ dữ liệu ban đầu
npx prisma db seed

# 3. Khởi động ứng dụng NestJS
echo "--- Starting NestJS Application ---"
node dist/src/main.js