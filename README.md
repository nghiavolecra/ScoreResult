# 🔍 ScoreResult - Ứng dụng Tra cứu và Thống kê Điểm Thi THPT

Dự án này là bài tập thực tập dành cho vị trí Web Developer Intern tại Golden Owl. Ứng dụng được xây dựng với frontend bằng **ReactJS**, backend bằng **Laravel**, có sử dụng **Docker** để triển khai toàn bộ hệ thống.

---

## 📁 Cấu trúc Dự án

```
.
├── backend/       # Laravel Project
├── frontend/      # ReactJS Project
├── docker-compose.yml
└── README.md
```

---

## 🚀 Hướng dẫn chạy dự án

### Cách 1: Chạy bằng Docker

**Bước 1:** Tại thư mục gốc, chạy lệnh:

```bash
docker-compose up --build
```

**Bước 2:** Truy cập:

- Frontend React: http://localhost:3000
- Backend Laravel API: http://localhost:8000

> 💡 Cơ sở dữ liệu sử dụng MySQL. Laravel kết nối qua service `mysql` trong Docker.

---

### Cách 2: Chạy thủ công

#### ⚙️ Backend (Laravel)

**Yêu cầu:** PHP 8.x, Composer, MySQL

```bash
cd backend
cp .env.example .env
composer install
php artisan key:generate

# Chỉnh sửa file .env để phù hợp kết nối DB
php artisan migrate --seed
php artisan serve
```

API chạy tại: http://localhost:8000

#### 🌐 Frontend (React)

**Yêu cầu:** Node.js >= 18

```bash
cd frontend
npm install
npm run dev
```

Frontend chạy tại: http://localhost:3000

---

## ✅ Tính năng

- ✅ Import file CSV điểm thi vào database
- ✅ Tìm kiếm điểm theo số báo danh
- ✅ Thống kê số lượng học sinh theo 4 mức điểm
- ✅ Biểu đồ thống kê theo môn học
- ✅ Top 10 thí sinh khối A (Toán, Lý, Hóa)

---

## 📦 Công nghệ sử dụng

- Frontend: ReactJS, Chart.js
- Backend: Laravel, MySQL
- Triển khai: Docker, Docker Compose
