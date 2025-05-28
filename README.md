# 🎓 ScoreResult – Bài tập Web Dev Intern Assignment 3 (Golden Owl)

## 🛠 Công nghệ sử dụng

| Phần       | Công nghệ        |
|------------|------------------|
| Frontend   | ReactJS          |
| Backend    | Laravel 10       |
| CSDL       | MySQL 8          |
| Container  | Docker Compose   |

## 🐳 Hướng dẫn chạy bằng Docker

### ▶️ Chạy toàn bộ hệ thống

```bash
docker-compose up --build
```

### 🔧 Các dịch vụ

| Dịch vụ    | Địa chỉ           |
|------------|-------------------|
| Frontend   | http://localhost:3000 |
| Backend    | http://localhost:8000 |
| MySQL      | localhost:3306    |

---

## 🧪 Cách sử dụng

### 1. Nhập dữ liệu từ CSV vào CSDL

Trong thư mục `backend/`, tạo migration và seeder rồi chạy:

```bash
php artisan migrate --seed
```

> Seeder sẽ đọc file `dataset/diem_thi_thpt_2024.csv` và đẩy dữ liệu vào DB

---

