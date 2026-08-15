-- ============================================================
-- Sistema Monitor - Esquema de Base de Datos
-- Fecha: 2026-08-04
-- ============================================================

CREATE DATABASE IF NOT EXISTS sistema_monitor
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE sistema_monitor;

-- ------------------------------------------------------------
-- Tabla: hosts
-- Máquinas monitoreadas
-- ------------------------------------------------------------
CREATE TABLE hosts (
    id         INT AUTO_INCREMENT PRIMARY KEY,
    name       VARCHAR(100) NOT NULL,
    ip_address VARCHAR(45),
    os         VARCHAR(50),
    is_active  BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ------------------   ------------------------------------------
-- Tabla: users
-- Usuarios del sistema (admin o viewer)
-- ------------------------------------------------------------
CREATE TABLE users (
    id         INT AUTO_INCREMENT PRIMARY KEY,
    username   VARCHAR(50) UNIQUE NOT NULL,
    password   VARCHAR(255) NOT NULL,
    role       ENUM('admin', 'viewer') DEFAULT 'viewer',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ------------------------------------------------------------
-- Tabla: host_permissions
-- Qué hosts puede ver cada viewer
-- ------------------------------------------------------------
CREATE TABLE host_permissions (
    id      INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    host_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (host_id) REFERENCES hosts(id) ON DELETE CASCADE,
    UNIQUE (user_id, host_id)
);

-- ------------------------------------------------------------
-- Tabla: resource_logs
-- Historial de métricas (CPU, RAM, Disco)
-- ------------------------------------------------------------
CREATE TABLE resource_logs (
    id           BIGINT AUTO_INCREMENT PRIMARY KEY,
    host_id      INT NOT NULL,
    cpu_percent  DECIMAL(5,2) NOT NULL,
    ram_percent  DECIMAL(5,2) NOT NULL,
    disk_percent DECIMAL(5,2) NOT NULL,
    logged_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (host_id) REFERENCES hosts(id) ON DELETE CASCADE,
    INDEX idx_host_logged (host_id, logged_at)
);

-- ============================================================
-- SEEDS INICIALES
-- ============================================================

-- 2 hosts de prueba
INSERT INTO hosts (name, ip_address, os) VALUES
('Servidor Principal', 'localhost',     'Linux'),
('Estación Trabajo 1', '192.168.1.10', 'Windows');

-- 2 usuarios (contraseñas en texto plano por ahora)
INSERT INTO users (username, password, role) VALUES
('admin',   'admin123',  'admin'),
('viewer1', 'viewer123', 'viewer');

-- viewer1 solo puede ver el host 1 (Servidor Principal)
INSERT INTO host_permissions (user_id, host_id) VALUES
(2, 1);
