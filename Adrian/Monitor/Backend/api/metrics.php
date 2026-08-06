<?php
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');

$host = 'localhost';
$dbname = 'monitor_hw';
$username = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $pdo->query("SELECT * FROM metricas_rendimiento ORDER BY id DESC LIMIT 1");
    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    if($row){
        $response = [
            "status" => "success",
            "data" => [
                "cpu_percent" => (float)$row['uso_cpu'],
                "ram_percent" => (float)$row['uso_ram'],
                "ram_gb_usados" => (float)$row['ram_gb_usados'],
                "gpu_percent" => (float)$row['uso_gpu'],
                "gpu_temp" => (float)$row['temp_gpu'],
                "network_rx_kbps" => (float)$row['red_bajada_kbps'],
                "network_tx_kbps" => (float)$row['red_subida_kbps'],
                "disks_info" => json_decode($row['info_discos'], true),
                "timestamp" => $row['registrado_en'],
            ]
        ];
    } else {
        $response = [
            "status" => "error",
            "message" => "Aun no hay datos de hardware"
        ];
    }
    echo json_encode($response);
} catch(PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "status"=> "error",
        "message"=> "Error de conexion a la base de datos: " . $e->getMessage()
    ]);
}
?>