<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "nba";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$searchTerm = $_GET['term']; // Suponiendo que se envía mediante GET

$results = array(); // Array para almacenar los resultados

// Obtener nombres de tablas en la base de datos
$tablesQuery = "SHOW TABLES";
$tablesResult = $conn->query($tablesQuery);

if ($tablesResult) {
    while ($row = $tablesResult->fetch_row()) {
        $tableName = $row[0];

        // Excluir la tabla "equipos"
        if ($tableName !== 'equipos') {
            // Obtener nombres de columnas en la tabla actual
            $columnsQuery = "SHOW COLUMNS FROM $tableName";
            $columnsResult = $conn->query($columnsQuery);

            if ($columnsResult) {
                while ($columnRow = $columnsResult->fetch_assoc()) {
                    $columnName = $columnRow['Field'];

                    // Realizar búsqueda en la tabla y columna actual
                    $searchQuery = "SELECT * FROM $tableName WHERE $columnName LIKE '%$searchTerm%'";
                    $searchResult = $conn->query($searchQuery);

                    if ($searchResult->num_rows > 0) {
                        while ($searchRow = $searchResult->fetch_assoc()) {
                            // Agregar los resultados al array
                            $results[] = $searchRow;
                        }
                    }
                }
            }
        }
    }
}

echo json_encode($results); // Devolver los resultados como JSON

$conn->close();
?>