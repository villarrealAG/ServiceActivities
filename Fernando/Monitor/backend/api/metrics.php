<?php

require_once BASE_PATH . '/api/helpers/auth.php';

if (API_METHOD !== 'GET' || API_PATH !== '/api/metrics') {
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

$user = requireAuthenticatedUser();
$db = Database::getInstance();
requireHostAccess($db, $user['id'], $hostId);

$script = BASE_PATH . '/scripts/monitor.py';
$pythonBinary = getenv('MONITOR_PYTHON') ?: 'python';
$command = escapeshellcmd($pythonBinary)
    . ' ' . escapeshellarg($script)
    . ' --host-id=' . $hostId
    . ' 2>&1';

$output = [];
$exitCode = 0;
exec($command, $output, $exitCode);
$rawOutput = trim(implode("\n", $output));
$metrics = json_decode($rawOutput, true);

if ($exitCode !== 0 || !is_array($metrics) || isset($metrics['error'])) {
    http_response_code(503);
    echo json_encode([
        'error' => 'No fue posible obtener las métricas del monitor',
        'detail' => $metrics['error'] ?? $rawOutput ?: 'El script no devolvió JSON válido',
    ]);
    return;
}

foreach (['cpu', 'ram', 'disk'] as $metric) {
    if (!isset($metrics[$metric]) || !is_numeric($metrics[$metric])) {
        http_response_code(502);
        echo json_encode(['error' => 'El monitor devolvió métricas inválidas']);
        return;
    }
}

try {
    $statement = $db->prepare(
        'INSERT INTO resource_logs (host_id, cpu_percent, ram_percent, disk_percent)
         VALUES (:host_id, :cpu, :ram, :disk)'
    );
    $statement->execute([
        'host_id' => $hostId,
        'cpu' => $metrics['cpu'],
        'ram' => $metrics['ram'],
        'disk' => $metrics['disk'],
    ]);
} catch (PDOException $exception) {
    http_response_code(500);
    echo json_encode(['error' => 'No fue posible guardar las métricas']);
    return;
}

echo json_encode([
    'host_id' => $hostId,
    'cpu' => (float) $metrics['cpu'],
    'ram' => (float) $metrics['ram'],
    'disk' => (float) $metrics['disk'],
    'timestamp' => $metrics['timestamp'] ?? gmdate('Y-m-d H:i:s'),
]);
