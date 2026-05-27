<?php
// guardar_inscripcion.php

require_once "conexiones.php";

// Verificar que el formulario llegue por POST
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    header("Location: index.php");
    exit;
}

// Recibir y limpiar datos
$correo = trim($_POST["correo"] ?? "");
$apellido = trim($_POST["apellido"] ?? "");
$nombre = trim($_POST["nombre"] ?? "");
$dni = trim($_POST["dni"] ?? "");
$fecha_nacimiento = trim($_POST["fecha_nacimiento"] ?? "");
$sexo = trim($_POST["sexo"] ?? "");
$celular = trim($_POST["celular"] ?? "");
$curso = trim($_POST["curso"] ?? "");
$escuela = trim($_POST["escuela"] ?? "");
$horario = trim($_POST["horario"] ?? "");
$curso_completo = trim($_POST["curso_completo"] ?? "");
$grupo_id = trim($_POST["grupo_id"] ?? "");

// Validar campos obligatorios
$errores = [];

if ($correo === "") {
    $errores[] = "El correo es obligatorio.";
}

if (!filter_var($correo, FILTER_VALIDATE_EMAIL)) {
    $errores[] = "El correo ingresado no es válido.";
}

if ($apellido === "") {
    $errores[] = "El apellido es obligatorio.";
}

if ($nombre === "") {
    $errores[] = "El nombre es obligatorio.";
}

if ($dni === "") {
    $errores[] = "El DNI es obligatorio.";
}

if ($fecha_nacimiento === "") {
    $errores[] = "La fecha de nacimiento es obligatoria.";
}

if ($sexo === "") {
    $errores[] = "El sexo es obligatorio.";
}

if ($celular === "") {
    $errores[] = "El celular es obligatorio.";
}

if ($curso === "") {
    $errores[] = "Debe seleccionar un curso.";
}

if ($escuela === "") {
    $errores[] = "Debe seleccionar una sede.";
}

if ($horario === "") {
    $errores[] = "Debe seleccionar un horario.";
}

if ($grupo_id === "") {
    $grupo_id = null;
} else {
    $grupo_id = intval($grupo_id);
}

// Si hay errores, mostrar mensaje y cortar
if (!empty($errores)) {
    mostrarMensaje(
        "error",
        "No se pudo guardar la preinscripción",
        $errores
    );
    exit;
}

// Evitar doble inscripción del mismo DNI en el mismo grupo
$consulta = $conexion->prepare("
    SELECT id 
    FROM preinscripciones 
    WHERE dni = ? AND grupo_id = ?
    LIMIT 1
");

if (!$consulta) {
    mostrarMensaje(
        "error",
        "Error al preparar la consulta de verificación",
        [$conexion->error]
    );
    exit;
}

$consulta->bind_param("si", $dni, $grupo_id);
$consulta->execute();
$resultado = $consulta->get_result();

if ($resultado && $resultado->num_rows > 0) {
    mostrarMensaje(
        "error",
        "Preinscripción duplicada",
        [
            "Ya existe una preinscripción registrada con ese DNI para el curso y horario seleccionado."
        ]
    );
    exit;
}

$consulta->close();

// Insertar inscripción
$stmt = $conexion->prepare("
    INSERT INTO preinscripciones (
        correo,
        apellido,
        nombre,
        dni,
        fecha_nacimiento,
        sexo,
        celular,
        curso,
        escuela,
        horario,
        curso_completo,
        grupo_id
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
");

if (!$stmt) {
    mostrarMensaje(
        "error",
        "Error al preparar el guardado",
        [$conexion->error]
    );
    exit;
}

$stmt->bind_param(
    "sssssssssssi",
    $correo,
    $apellido,
    $nombre,
    $dni,
    $fecha_nacimiento,
    $sexo,
    $celular,
    $curso,
    $escuela,
    $horario,
    $curso_completo,
    $grupo_id
);

if ($stmt->execute()) {
    mostrarMensaje(
        "exito",
        "Preinscripción registrada correctamente",
        [
            "Gracias, $nombre $apellido.",
            "Tu preinscripción fue recibida.",
            "Curso: $curso",
            "Sede: Centro de Formación Profesional Itinerante N.º 2",
            "Horario: $horario",
            "Código de grupo: " . ($grupo_id ?? "Sin código")
        ]
    );
} else {
    mostrarMensaje(
        "error",
        "No se pudo guardar la preinscripción",
        [$stmt->error]
    );
}

$stmt->close();
$conexion->close();


// Función para mostrar mensajes
function mostrarMensaje($tipo, $titulo, $mensajes) {
    $clase = $tipo === "exito" ? "exito" : "error";
    ?>
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <title>Resultado de preinscripción</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="style.css">
    </head>
    <body>

        <div class="contenedor">
            <div class="encabezado">
                <h1>Centro de Formación Profesional Itinerante N.º 2</h1>
                <h2>Preinscripciones 2026</h2>
            </div>

            <div class="alerta <?php echo $clase; ?>">
                <?php echo htmlspecialchars($titulo, ENT_QUOTES, "UTF-8"); ?>
            </div>

            <div class="bloque-seleccion">
                <?php foreach ($mensajes as $mensaje): ?>
                    <p>
                        <?php echo htmlspecialchars($mensaje, ENT_QUOTES, "UTF-8"); ?>
                    </p>
                <?php endforeach; ?>
            </div>

            <a href="index.php" class="boton">Volver al formulario</a>
        </div>

    </body>
    </html>
    <?php
}
?>