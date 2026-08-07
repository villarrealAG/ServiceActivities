<?php

require_once BASE_PATH . '/api/helpers/auth.php';

if (API_METHOD !== 'GET' || API_PATH !== '/api/history') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    return;
}

$hostId = filter_input(INPUT_GET, 'host_id', FILTER_VALIDATE_INT, [
    'options' => ['min_range' => 1],
]);

if ($hostId === false || $hostId === null) {
    http_response_code(400);
    echo json_encode(['error' => 'host_id debe ser un entero positivo']);
    return;
}

/**
 * El API acepta fechas ISO simples: YYYY-MM-DD. El final es inclusivo,
 * por lo que internamente se consulta hasta el inicio del día siguiente.
 */
function parseHistoryDate(?string $value, bool $isEnd = false): ?string
{
    if ($value === null || $value === '') {
        return null;
    }

    $date = DateTimeImmutable::createFromFormat('!Y-m-d', $value);
    $errors = DateTimeImmutable::getLastErrors();
    if (!$date || ($errors !== false && ($errors['warning_count'] || $errors['error_count']))) {
        return null;
    }

    return ($isEnd ? $date->modify('+1 day') : $date)->format('Y-m-d H:i:s');
}

$from = parseHistoryDate($_GET['from'] ?? null);
$to = parseHistoryDate($_GET['to'] ?? null, true);

if (isset($_GET['from']) && $from === null || isset($_GET['to']) && $to === null) {
    http_response_code(400);
    echo json_encode(['error' => 'Las fechas deben tener el formato YYYY-MM-DD']);
    return;
}

$from ??= (new DateTimeImmutable('-24 hours'))->format('Y-m-d H:i:s');
$to ??= (new DateTimeImmutable('+1 second'))->format('Y-m-d H:i:s');

if ($from >= $to) {
    http_response_code(400);
    echo json_encode(['error' => 'La fecha inicial debe ser anterior a la fecha final']);
    return;
}

$user = requireAuthenticatedUser();
$db = Database::getInstance();
requireHostAccess($db, $user['id'], $hostId);

$statement = $db->prepare(
    'SELECT cpu_percent AS cpu, ram_percent AS ram, disk_percent AS disk, logged_at AS timestamp
     FROM resource_logs
     WHERE host_id = :host_id AND logged_at >= :from_date AND logged_at < :to_date
     ORDER BY logged_at ASC
     LIMIT 1000'
);
$statement->execute([
    'host_id' => $hostId,
    'from_date' => $from,
    'to_date' => $to,
]);

echo json_encode([
    'host_id' => $hostId,
    'from' => $from,
    'to' => $to,
    'data' => $statement->fetchAll(),
]);
