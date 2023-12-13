<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Establece la conexión a la base de datos
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "nba";

// Verifica la conexión
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Verifica si se reciben los parámetros de filtro
if (isset($_GET['temporada']) || isset($_GET['equipo'])) {
    $temporada = isset($_GET['temporada']) ? $_GET['temporada'] : null;
    $equipo = isset($_GET['equipo']) ? $_GET['equipo'] : null;

    // Construir la consulta SQL
    if ($temporada && $equipo) {
        // Consulta para filtrar por temporada y equipo
        $sql = "SELECT * FROM partidos WHERE temporada = '$temporada' AND (equipo_local = '$equipo' OR equipo_visitante = '$equipo')";
    } else if ($equipo && !$temporada) {
        // Consulta para filtrar solo por equipo si solo se proporciona el filtro de equipo
        $sql = "SELECT * FROM partidos WHERE equipo_local = '$equipo' OR equipo_visitante = '$equipo'";
    } else if (!$temporada && !$equipo) {
        // Consulta para obtener todos los partidos si no hay filtros aplicados
        $sql = "SELECT * FROM partidos";
    }

    // Ejecutar la consulta SQL
    $result = $conn->query($sql);

    if ($result) {
        if ($result->num_rows > 0) {
            // Convierte los datos a un formato JSON y envíalos
            $data = array();
            while ($row = $result->fetch_assoc()) {
                $data[] = $row;
            }
            echo json_encode($data);
        } else {
            echo json_encode(array('message' => 'No se encontraron partidos con esos filtros'));
        }
    } else {
        echo json_encode(array('message' => 'Error en la consulta: ' . $conn->error));
    }
} else {
    echo json_encode(array('message' => 'Se requiere al menos un parámetro de filtro'));
}

$conn->close();
?>