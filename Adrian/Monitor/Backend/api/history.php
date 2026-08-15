<?php

header('content-Type: application/json; cahrset=UTF-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');

$host='localhost';
$dbname='monitor_hw';
$username='root';
$password='';

$start=isset($_GET['start'])?$_GET['start']:date('Y-m-d 00:00:00');
$end=isset($_GET['end'])?$_GET['end']:date('Y-m-d 23:59:59');

try{
    $pdo = new PDO("mysql:host=$host;dbname=$dbname",$username,$password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);

    $stmt = $pdo->prepare("SELECT * FROM metricas_rendimiento WHERE registrado_en BETWEEN :start AND :end ORDER BY registrado_en ASC LIMIT 200");
    $stmt->execute(['start' => $start, 'end' => $end]);
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $formatted_data = [];

    foreach ($rows as $row){
        $formatted_data[] = [
            "cpu_percent" => (float)$row['uso_cpu'],
            "ram_percent" => (float)$row['uso_ram'],
            "ram_gb_usados" => (float)$row['ram_gb_usados'],
            "gpu_percent" => (float)$row['uso_gpu'],
            "gpu_temp" => (float)$row['temp_gpu'],
            "network_rx_kbps" => (float)$row['red_bajada_kbps'],
            "network_tx_kbps" => (float)$row['red_subida_kbps'],
            "disks_info" => json_decode($row['info_discos'], true),
            "timestamp" => $row['registrado_en']
        ];
    }

    echo json_encode([
        "status" => "success",
        "data" => $formatted_data
    ]);
} catch(PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => "Error de conexion de base de datos: " . $e->getMessage()
    ]);
}
?>