<?php

require_once BASE_PATH . '/api/helpers/auth.php';

if (API_METHOD !== 'GET' || API_PATH !== '/api/hosts') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    return;
}

$user = requireAuthenticatedUser();
$db = Database::getInstance();

if ($user['role'] === 'admin') {
    $statement = $db->query(
        'SELECT id, name, ip_address, os, is_active FROM hosts ORDER BY name ASC'
    );
} else {
    $statement = $db->prepare(
        'SELECT h.id, h.name, h.ip_address, h.os, h.is_active
         FROM hosts h
         INNER JOIN host_permissions hp ON hp.host_id = h.id
         WHERE hp.user_id = :user_id
         ORDER BY h.name ASC'
    );
    $statement->execute(['user_id' => $user['id']]);
}

echo json_encode($statement->fetchAll());
