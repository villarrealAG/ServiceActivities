<?php
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');

$response = [
    "status" => "success",
    "data" => [
        "cpu_percent" => 0,
        "ram_percent" => 0,
        "ram_gb_usados" => 0,
        "gpu_percent" => 0,
        "gpu_temp" => 0,
        "network_rx_kbps" => 0,
        "network_tx_kbps" => 0,
        "disks_info" => [] // Aquí irá el JSON parseado de la BD
    ],
    "message" => "Esqueleto listo para conectar con monitor_hw"
];

echo json_encode($response);
?>