<?php
// Verificar si se ha enviado una solicitud POST para cambiar las luces del semáforo
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Recibir el estado actual del semáforo desde el formulario
    $current_state = $_POST["current_state"];

    // Definir los estados de los semáforos
    $states = array("green", "yellow", "red");

    // Obtener el índice del estado actual
    $current_index = array_search($current_state, $states);

    // Calcular el siguiente estado
    $next_index = ($current_index + 1) % count($states);

    // Obtener el siguiente estado
    $next_state = $states[$next_index];

    // Devolver el siguiente estado como respuesta
    echo $next_state;
} else {
    // Si no hay una solicitud POST, simplemente redirigir a la página principal
    header("Location: index.html");
    exit();
}
?>
