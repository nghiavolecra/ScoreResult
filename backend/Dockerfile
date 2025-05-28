FROM php:8.2-apache

# Cài đặt các gói cần thiết
RUN apt-get update && apt-get install -y \
    git curl zip unzip libzip-dev \
    && docker-php-ext-install pdo_mysql zip

# Cài Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Bật mod_rewrite cho Apache (Laravel cần)
RUN a2enmod rewrite

# Làm việc trong thư mục này
WORKDIR /var/www/html

# Copy toàn bộ source code Laravel vào container
COPY . /var/www/html

# Cài package PHP
RUN composer install

# Tạo app key (sẽ fail nếu chưa có `.env`)
RUN php artisan key:generate || true
