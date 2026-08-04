<?php
// ============================================================
// config/database.php
// Conexión PDO a MySQL (Singleton)
// ============================================================

class Database
{
    // Configuración de conexión
    private static string $host     = 'localhost';
    private static string $dbname   = 'sistema_monitor';
    private static string $user     = 'root';
    private static string $password = '';          // XAMPP: sin contraseña
    private static string $charset  = 'utf8mb4';

    // Instancia única
    private static ?PDO $instance = null;

    // Constructor privado → no se puede instanciar directamente
    private function __construct() {}

    /**
     * Devuelve la única instancia PDO (crea la conexión si no existe).
     */
    public static function getInstance(): PDO
    {
        if (self::$instance === null) {
            $dsn = sprintf(
                'mysql:host=%s;dbname=%s;charset=%s',
                self::$host,
                self::$dbname,
                self::$charset
            );

            try {
                self::$instance = new PDO($dsn, self::$user, self::$password, [
                    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                    PDO::ATTR_EMULATE_PREPARES   => false,
                ]);
            } catch (PDOException $e) {
                // Responde con JSON de error y termina
                http_response_code(500);
                header('Content-Type: application/json');
                echo json_encode([
                    'error'   => 'Database connection failed',
                    'message' => $e->getMessage(),
                ]);
                exit;
            }
        }

        return self::$instance;
    }
}
