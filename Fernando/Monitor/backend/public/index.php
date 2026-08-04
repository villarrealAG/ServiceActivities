<?php
// ============================================================
// public/index.php
// Entry point del backend — Router central
// ============================================================

// ── 0. Sesión ────────────────────────────────────────────────
session_start();

// ── 1. CORS ──────────────────────────────────────────────────
$allowed_origin = 'http://localhost:5173';   // Vite dev server

if (isset($_SERVER['HTTP_ORIGIN']) && $_SERVER['HTTP_ORIGIN'] === $allowed_origin) {
    header("Access-Control-Allow-Origin: {$allowed_origin}");
} else {
    header("Access-Control-Allow-Origin: {$allowed_origin}");  // dev: siempre permitir
}

header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, X-Requested-With');
header('Content-Type: application/json; charset=UTF-8');

// Responde inmediatamente a preflight OPTIONS y termina
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// ── 2. Autoload (config + api) ───────────────────────────────
define('BASE_PATH', dirname(__DIR__));

require_once BASE_PATH . '/config/database.php';

// ── 3. Router ────────────────────────────────────────────────
// URI limpia: /api/auth/login  →  ['', 'api', 'auth', 'login']
$uri    = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri    = rtrim($uri, '/');
$method = $_SERVER['REQUEST_METHOD'];

// Detecta el segmento de ruta eliminando el prefijo del proyecto
// Ejemplo: /sistema-monitor/backend/public/api/auth/login
// → elimina todo hasta /api/
$pattern = '#.*?/api(/.*)?$#';
if (preg_match($pattern, $uri, $matches)) {
    $path = '/api' . ($matches[1] ?? '');
} else {
    $path = $uri;
}

// Tabla de rutas → archivo de controlador
$routes = [
    '/api/auth'    => BASE_PATH . '/api/auth.php',
    '/api/hosts'   => BASE_PATH . '/api/hosts.php',
    '/api/metrics' => BASE_PATH . '/api/metrics.php',
    '/api/history' => BASE_PATH . '/api/history.php',
    '/api/reports' => BASE_PATH . '/api/reports.php',
];

// Busca coincidencia por prefijo de ruta
$matched = false;
foreach ($routes as $prefix => $file) {
    if (str_starts_with($path, $prefix)) {
        if (file_exists($file)) {
            // Pasa la sub-ruta al controlador como constante
            define('API_PATH',   $path);
            define('API_METHOD', $method);
            require $file;
            $matched = true;
            break;
        }
    }
}

if (!$matched) {
    http_response_code(404);
    echo json_encode(['error' => 'Endpoint not found', 'path' => $path]);
}
