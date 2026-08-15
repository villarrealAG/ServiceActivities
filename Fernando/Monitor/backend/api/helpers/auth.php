<?php

function requireAuthenticatedUser(): array
{
    if (empty($_SESSION['user_id']) || empty($_SESSION['role'])) {
        http_response_code(401);
        echo json_encode(['error' => 'No autenticado']);
        exit;
    }

    return ['id' => (int) $_SESSION['user_id'], 'role' => $_SESSION['role']];
}

function canAccessHost(PDO $db, int $userId, int $hostId): bool
{
    if (($_SESSION['role'] ?? '') === 'admin') {
        return true;
    }

    $statement = $db->prepare(
        'SELECT 1 FROM host_permissions WHERE user_id = :user_id AND host_id = :host_id LIMIT 1'
    );
    $statement->execute(['user_id' => $userId, 'host_id' => $hostId]);

    return (bool) $statement->fetchColumn();
}

function requireHostAccess(PDO $db, int $userId, int $hostId): void
{
    if (!canAccessHost($db, $userId, $hostId)) {
        http_response_code(403);
        echo json_encode(['error' => 'No tienes permiso para acceder a este host']);
        exit;
    }
}
