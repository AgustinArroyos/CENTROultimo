<?php
// index.php
// Página de preinscripción 2026
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Preinscripción 2026 - CFPI N.º 2</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- CSS general -->
    <link rel="stylesheet" href="style.css">
</head>

<body>

<div class="contenedor">

    <div class="encabezado">
        <h1>Centro de Formación Profesional Itinerante N.º 2</h1>
        <h2>Preinscripciones 2026</h2>
    </div>

    <form action="guardar_inscripcion.php" method="POST">

        <!-- PASO 1: CURSOS -->
        <div id="pasoCursos" class="bloque-seleccion">
            <h3>Paso 1: Seleccione el curso</h3>

            <div class="grilla-cursos">

                <button type="button" class="boton-curso" data-curso="Diseño CAD e Impresión 3D">
                    Diseño CAD e Impresión 3D
                </button>

                <button type="button" class="boton-curso" data-curso="Electricidad">
                    Electricidad
                </button>

                <button type="button" class="boton-curso" data-curso="Secretariado Contable">
                    Secretariado Contable
                </button>

                <button type="button" class="boton-curso" data-curso="Marketing Digital">
                    Marketing Digital
                </button>

                <button type="button" class="boton-curso" data-curso="Análisis de Datos">
                    Análisis de Datos
                </button>

                <button type="button" class="boton-curso" data-curso="Programación Web">
                    Programación Web
                </button>

                <button type="button" class="boton-curso" data-curso="Programación">
                    Programación
                </button>

                <button type="button" class="boton-curso" data-curso="Reparación de PC">
                    Reparación de PC
                </button>

                <button type="button" class="boton-curso" data-curso="Reparación de Celulares">
                    Reparación de Celulares
                </button>

                <button type="button" class="boton-curso" data-curso="Finanzas">
                    Finanzas
                </button>

                <button type="button" class="boton-curso" data-curso="Robótica">
                    Robótica
                </button>

                <button type="button" class="boton-curso" data-curso="Operador de PC">
                    Operador de PC
                </button>

            </div>

            <input type="hidden" id="curso" name="curso" required>
        </div>

        <!-- PASO 2: ESCUELA -->
        <div id="pasoEscuela" class="bloque-seleccion bloque-oculto">
            <h3>Paso 2: Seleccione la escuela / sede</h3>

            <p class="seleccion-previa">
                Curso seleccionado: <strong id="textoCursoSeleccionado"></strong>
            </p>

            <label for="escuela">Escuela / sede</label>
            <select id="escuela" name="escuela" required>
                <option value="">Seleccione una opción</option>
                <option value="CENTRO DE FORMACIÓN PROFESIONAL ITINERANTE 2">
                    Centro de Formación Profesional Itinerante N.º 2
                </option>
            </select>

            <button type="button" class="boton-secundario" id="volverCursos">
                Cambiar curso
            </button>
        </div>

        <!-- PASO 3: HORARIO -->
        <div id="pasoHorario" class="bloque-seleccion bloque-oculto">
            <h3>Paso 3: Seleccione el horario</h3>

            <p class="seleccion-previa">
                Curso: <strong id="textoCursoHorario"></strong><br>
                Sede: <strong>Centro de Formación Profesional Itinerante N.º 2</strong>
            </p>

            <label for="horario">Horario disponible</label>
            <select id="horario" name="horario" required>
                <option value="">Seleccione un horario</option>
            </select>

            <button type="button" class="boton-secundario" id="volverEscuela">
                Cambiar escuela
            </button>
        </div>

       <!-- PASO 4: DATOS PERSONALES -->
<div id="pasoDatos" class="bloque-seleccion bloque-oculto bloque-datos">
    <h3>Paso 4: Datos personales</h3>

    <div id="resumen" class="resumen"></div>

<div class="intro-datos">
    <div class="icono-datos">✨</div>
    <div>
        <h4>¡Ya casi terminás!</h4>
        <p>
            Completá tus datos personales para registrar tu preinscripción. 
            Revisá que la información sea correcta antes de enviar.
        </p>
    </div>
</div>

    <div class="form-grid">

        <div class="campo campo-completo">
            <label for="correo">Correo electrónico</label>
            <input 
                type="email" 
                id="correo" 
                name="correo" 
                placeholder="ejemplo@correo.com"
                required
            >
        </div>

        <div class="campo">
            <label for="apellido">Apellido</label>
            <input 
                type="text" 
                id="apellido" 
                name="apellido" 
                placeholder="Ingrese su apellido"
                required
            >
        </div>

        <div class="campo">
            <label for="nombre">Nombre</label>
            <input 
                type="text" 
                id="nombre" 
                name="nombre" 
                placeholder="Ingrese su nombre"
                required
            >
        </div>

        <div class="campo">
            <label for="dni">DNI</label>
            <input 
                type="text" 
                id="dni" 
                name="dni" 
                placeholder="Sin puntos"
                required
            >
        </div>

        <div class="campo">
            <label for="fecha_nacimiento">Fecha de nacimiento</label>
            <input 
                type="date" 
                id="fecha_nacimiento" 
                name="fecha_nacimiento"
                required
            >
        </div>

        <div class="campo">
            <label for="sexo">Sexo</label>
            <select id="sexo" name="sexo" required>
                <option value="">Seleccione una opción</option>
                <option value="Femenino">Femenino</option>
                <option value="Masculino">Masculino</option>
                <option value="Otro">Otro</option>
                <option value="Prefiero no decirlo">Prefiero no decirlo</option>
            </select>
        </div>

        <div class="campo">
            <label for="celular">Celular</label>
            <input 
                type="tel" 
                id="celular" 
                name="celular" 
                placeholder="Ej: 3764..."
                required
            >
        </div>

    </div>

    <input type="hidden" id="curso_completo" name="curso_completo">
    <input type="hidden" id="grupo_id" name="grupo_id">

    <p class="nota">
        La preinscripción no confirma automáticamente la vacante.
        La institución podrá comunicarse para confirmar disponibilidad, documentación y condiciones de cursado.
    </p>

    <div class="acciones-datos">
        <button type="submit" class="boton-enviar">
            Enviar preinscripción
        </button>

        <button type="button" class="boton-secundario" id="volverHorario">
            Cambiar horario
        </button>
    </div>
</div>
    </form>

</div>

<script>
    const horariosPorCurso = {
        "Diseño CAD e Impresión 3D": [
            {
                grupo_id: "65",
                horario: "Lunes y Miércoles 14:30 hs"
            }
        ],

        "Electricidad": [
            {
                grupo_id: "66",
                horario: "Lunes y Miércoles 14:30 hs"
            }
        ],

        "Secretariado Contable": [
            {
                grupo_id: "67",
                horario: "Lunes y Miércoles 14:30 hs"
            }
        ],

        "Marketing Digital": [
            {
                grupo_id: "69",
                horario: "Lunes y Miércoles 18:00 hs"
            }
        ],

        "Análisis de Datos": [
            {
                grupo_id: "70",
                horario: "Martes 18:00 hs"
            }
        ],

        "Programación Web": [
            {
                grupo_id: "76",
                horario: "Martes 14:30 hs"
            }
        ],

        "Programación": [
            {
                grupo_id: "77",
                horario: "Martes 14:30 hs"
            }
        ],

        "Reparación de PC": [
            {
                grupo_id: "81",
                horario: "Martes 18:00 hs"
            }
        ],

        "Reparación de Celulares": [
            {
                grupo_id: "125",
                horario: "Lunes 18:00 hs"
            },
            {
                grupo_id: "127",
                horario: "Martes 18:00 hs"
            }
        ],

        "Finanzas": [
            {
                grupo_id: "128",
                horario: "Lunes y Miércoles 18:00 hs"
            }
        ],

        "Robótica": [
            {
                grupo_id: "129",
                horario: "Martes 14:30 hs"
            }
        ],

        "Operador de PC": [
            {
                grupo_id: "130",
                horario: "Martes 14:30 hs"
            }
        ]
    };

    const pasoCursos = document.getElementById("pasoCursos");
    const pasoEscuela = document.getElementById("pasoEscuela");
    const pasoHorario = document.getElementById("pasoHorario");
    const pasoDatos = document.getElementById("pasoDatos");

    const botonesCurso = document.querySelectorAll(".boton-curso");

    const cursoInput = document.getElementById("curso");
    const escuelaSelect = document.getElementById("escuela");
    const horarioSelect = document.getElementById("horario");

    const resumen = document.getElementById("resumen");
    const cursoCompleto = document.getElementById("curso_completo");
    const grupoIdInput = document.getElementById("grupo_id");

    const textoCursoSeleccionado = document.getElementById("textoCursoSeleccionado");
    const textoCursoHorario = document.getElementById("textoCursoHorario");

    const volverCursos = document.getElementById("volverCursos");
    const volverEscuela = document.getElementById("volverEscuela");
    const volverHorario = document.getElementById("volverHorario");

    function mostrarSolo(paso) {
        pasoCursos.classList.add("bloque-oculto");
        pasoEscuela.classList.add("bloque-oculto");
        pasoHorario.classList.add("bloque-oculto");
        pasoDatos.classList.add("bloque-oculto");

        paso.classList.remove("bloque-oculto");
        paso.scrollIntoView({ behavior: "smooth" });
    }

    function limpiarDesdeEscuela() {
        escuelaSelect.value = "";
        horarioSelect.innerHTML = '<option value="">Seleccione un horario</option>';
        resumen.style.display = "none";
        cursoCompleto.value = "";
        grupoIdInput.value = "";
    }

    function limpiarDesdeHorario() {
        horarioSelect.innerHTML = '<option value="">Seleccione un horario</option>';
        resumen.style.display = "none";
        cursoCompleto.value = "";
        grupoIdInput.value = "";
    }

    botonesCurso.forEach(function(boton) {
        boton.addEventListener("click", function() {
            const cursoElegido = this.getAttribute("data-curso");

            cursoInput.value = cursoElegido;
            textoCursoSeleccionado.textContent = cursoElegido;
            textoCursoHorario.textContent = cursoElegido;

            limpiarDesdeEscuela();

            mostrarSolo(pasoEscuela);
        });
    });

    escuelaSelect.addEventListener("change", function() {
        const cursoElegido = cursoInput.value;

        limpiarDesdeHorario();

        if (this.value === "" || cursoElegido === "") {
            return;
        }

        if (horariosPorCurso[cursoElegido]) {
            horariosPorCurso[cursoElegido].forEach(function(opcion) {
                const option = document.createElement("option");
                option.value = opcion.horario;
                option.textContent = opcion.horario;
                option.setAttribute("data-grupo", opcion.grupo_id);
                horarioSelect.appendChild(option);
            });
        }

        mostrarSolo(pasoHorario);
    });

    horarioSelect.addEventListener("change", function() {
        const curso = cursoInput.value;
        const escuela = escuelaSelect.value;
        const horario = horarioSelect.value;

        const opcionSeleccionada = horarioSelect.options[horarioSelect.selectedIndex];
        const grupoId = opcionSeleccionada ? opcionSeleccionada.getAttribute("data-grupo") : "";

        if (curso && escuela && horario) {
            resumen.style.display = "block";
            resumen.innerHTML = `
                <strong>Preinscripción seleccionada:</strong><br>
                <strong>Curso:</strong> ${curso}<br>
                <strong>Sede:</strong> Centro de Formación Profesional Itinerante N.º 2<br>
                <strong>Horario:</strong> ${horario}<br>
                <strong>Código de grupo:</strong> ${grupoId}
            `;

            cursoCompleto.value = `${curso} | Centro de Formación Profesional Itinerante N.º 2 | ${horario}`;
            grupoIdInput.value = grupoId;

            mostrarSolo(pasoDatos);
        }
    });

    volverCursos.addEventListener("click", function() {
        cursoInput.value = "";
        limpiarDesdeEscuela();
        mostrarSolo(pasoCursos);
    });

    volverEscuela.addEventListener("click", function() {
        limpiarDesdeHorario();
        mostrarSolo(pasoEscuela);
    });

    volverHorario.addEventListener("click", function() {
        mostrarSolo(pasoHorario);
    });
</script>

</body>
</html>