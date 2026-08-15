<?php
// ============================================================
// api/auth.php
// Autenticación con sesiones PHP nativas
//
// Rutas manejadas:
//   POST /api/auth/login   → valida credenciales, inicia sesión
//   POST /api/auth/logout  → destruye sesión
//   GET  /api/auth/me      → devuelve usuario activo o 401
// ============================================================

// BASE_PATH, API_PATH y API_METHOD vienen definidos desde index.php
// (session_start() y CORS ya se aplicaron en index.php)

$db     = Database::getInstance();
$method = API_METHOD;
$path   = API_PATH;   // ej: /api/auth/login

// ── Router interno de auth ───────────────────────────────────
if ($path === '/api/auth/login' && $method === 'POST') {
    handle_login($db);

} elseif ($path === '/api/auth/logout' && $method === 'POST') {
    handle_logout();

} elseif ($path === '/api/auth/me' && $method === 'GET') {
    handle_me();

} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed or route not found']);
}


// ============================================================
// HANDLERS
// ============================================================

/**
 * POST /api/auth/login
 * Body JSON: { "username": "...", "password": "..." }
 * Responde: { "id", "username", "role" } o 401
 */
function handle_login(PDO $db): void
{
    $body = json_decode(file_get_contents('php://input'), true);

    $username = trim($body['username'] ?? '');
    $password = trim($body['password'] ?? '');

    // Validación básica de entrada
    if ($username === '' || $password === '') {
        http_response_code(400);
        echo json_encode(['error' => 'Username y password son requeridos']);
        return;
    }

    // Busca el usuario en la DB
    $stmt = $db->prepare(
        'SELECT id, username, password, role FROM users WHERE username = ? LIMIT 1'
    );
    $stmt->execute([$username]);
    $user = $stmt->fetch();

    // Verifica que exista y que la contraseña coincida (texto plano por ahora)
    if (!$user || $user['password'] !== $password) {
        http_response_code(401);
        echo json_encode(['error' => 'Credenciales inválidas']);
        return;
    }

    // Guarda datos de sesión
    $_SESSION['user_id']   = $user['id'];
    $_SESSION['username']  = $user['username'];
    $_SESSION['role']      = $user['role'];

    http_response_code(200);
    echo json_encode([
        'id'       => $user['id'],
        'username' => $user['username'],
        'role'     => $user['role'],
    ]);
}


/**
 * POST /api/auth/logout
 * Destruye la sesión activa.
 * Responde: { "message": "Sesión cerrada" }
 */
function handle_logout(): void
{
    $_SESSION = [];

    // Elimina la cookie de sesión del navegador
    if (ini_get('session.use_cookies')) {
        $params = session_get_cookie_params();
        setcookie(
            session_name(),
            '',
            time() - 42000,
            $params['path'],
            $params['domain'],
            $params['secure'],
            $params['httponly']
        );
    }

    session_destroy();

    http_response_code(200);
    echo json_encode(['message' => 'Sesión cerrada correctamente']);
}


/**
 * GET /api/auth/me
 * Devuelve el usuario de la sesión activa o 401 si no hay sesión.
 * Responde: { "id", "username", "role" }
 */
function handle_me(): void
{
    if (empty($_SESSION['user_id'])) {
        http_response_code(401);
        echo json_encode(['error' => 'No autenticado']);
        return;
    }

    http_response_code(200);
    echo json_encode([
        'id'       => $_SESSION['user_id'],
        'username' => $_SESSION['username'],
        'role'     => $_SESSION['role'],
    ]);
}
