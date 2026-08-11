<?php
// GET /api/reports?host_id=1&from=YYYY-MM-DD&to=YYYY-MM-DD
// Generates a downloadable plain-text summary. Defaults to the last 7 days.

require_once BASE_PATH . '/api/helpers/auth.php';

if (API_METHOD !== 'GET' || API_PATH !== '/api/reports') {
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

function reportDate(?string $value, bool $isEnd = false): ?DateTimeImmutable
{
    if ($value === null || $value === '') {
        return null;
    }

    $date = DateTimeImmutable::createFromFormat('!Y-m-d', $value);
    $errors = DateTimeImmutable::getLastErrors();
    if (!$date || ($errors !== false && ($errors['warning_count'] || $errors['error_count']))) {
        return null;
    }

    return $isEnd ? $date->modify('+1 day') : $date;
}

$from = reportDate($_GET['from'] ?? null);
$to = reportDate($_GET['to'] ?? null, true);

if ((isset($_GET['from']) && $from === null) || (isset($_GET['to']) && $to === null)) {
    http_response_code(400);
    echo json_encode(['error' => 'Las fechas deben tener el formato YYYY-MM-DD']);
    return;
}

$to ??= new DateTimeImmutable('tomorrow');
$from ??= $to->modify('-7 days');

if ($from >= $to) {
    http_response_code(400);
    echo json_encode(['error' => 'La fecha inicial debe ser anterior a la fecha final']);
    return;
}

$user = requireAuthenticatedUser();
$db = Database::getInstance();
requireHostAccess($db, $user['id'], $hostId);

$hostStatement = $db->prepare('SELECT name, ip_address, os FROM hosts WHERE id = :host_id LIMIT 1');
$hostStatement->execute(['host_id' => $hostId]);
$host = $hostStatement->fetch();

if (!$host) {
    http_response_code(404);
    echo json_encode(['error' => 'Host no encontrado']);
    return;
}

$summaryStatement = $db->prepare(
    'SELECT COUNT(*) AS total_readings,
            AVG(cpu_percent) AS avg_cpu,
            AVG(ram_percent) AS avg_ram,
            AVG(disk_percent) AS avg_disk,
            MIN(logged_at) AS first_reading,
            MAX(logged_at) AS last_reading
     FROM resource_logs
     WHERE host_id = :host_id AND logged_at >= :from_date AND logged_at < :to_date'
);
$summaryStatement->execute([
    'host_id' => $hostId,
    'from_date' => $from->format('Y-m-d H:i:s'),
    'to_date' => $to->format('Y-m-d H:i:s'),
]);
$summary = $summaryStatement->fetch();

$periodEnd = $to->modify('-1 second')->format('d/m/Y');
$lines = [
    'REPORTE DE RECURSOS - SISTEMA MONITOR',
    str_repeat('=', 42),
    'Equipo: ' . $host['name'],
    'IP: ' . ($host['ip_address'] ?: 'No registrada'),
    'Sistema operativo: ' . ($host['os'] ?: 'No registrado'),
    'Periodo: ' . $from->format('d/m/Y') . ' al ' . $periodEnd,
    'Generado: ' . (new DateTimeImmutable())->format('d/m/Y H:i:s'),
    '',
    'RESUMEN',
    str_repeat('-', 42),
    'Total de lecturas: ' . $summary['total_readings'],
];

if ((int) $summary['total_readings'] === 0) {
    $lines[] = 'No hay lecturas registradas en el periodo seleccionado.';
} else {
    $lines[] = 'Promedio CPU: ' . number_format((float) $summary['avg_cpu'], 2) . '%';
    $lines[] = 'Promedio RAM: ' . number_format((float) $summary['avg_ram'], 2) . '%';
    $lines[] = 'Promedio Disco: ' . number_format((float) $summary['avg_disk'], 2) . '%';
    $lines[] = 'Primera lectura: ' . $summary['first_reading'];
    $lines[] = 'Ultima lectura: ' . $summary['last_reading'];
}

$safeHostName = preg_replace('/[^a-zA-Z0-9_-]+/', '-', $host['name']);
$filename = 'reporte-' . trim($safeHostName, '-') . '-' . $from->format('Ymd') . '-' . $to->modify('-1 second')->format('Ymd') . '.txt';

header('Content-Type: text/plain; charset=UTF-8');
header('Content-Disposition: attachment; filename="' . $filename . '"');
header('X-Content-Type-Options: nosniff');
echo "\xEF\xBB\xBF" . implode("\n", $lines) . "\n";
