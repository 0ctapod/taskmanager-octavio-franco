const inputTarea = document.getElementById("inputTarea");
const categoriaTarea = document.getElementById("categoriaTarea");
const inputOtraCategoria = document.getElementById("inputOtraCategoria");
const mensajeError = document.getElementById("mensajeError");
const agregarTarea = document.getElementById("agregarTarea");
const listaTareas = document.getElementById("listaTareas");
const tareasCompletadas = document.getElementById("tareasCompletadas");
const tareasTotales = document.getElementById("tareasTotales");
const btnLimpiar = document.getElementById("btnLimpiar");

let tareas = [];
let total = 0;
let completadas = 0;
let contadorId = 1;

categoriaTarea.addEventListener("change", function () {
    if (categoriaTarea.value === "otra") {
        inputOtraCategoria.style.display = "block";
    } else {
        inputOtraCategoria.style.display = "none";
        inputOtraCategoria.value = "";
    }
});

function actualizarContador() {
    tareasTotales.textContent = total;
    tareasCompletadas.textContent = completadas;
}

function agregarNuevaTarea() {
    const textoTarea = inputTarea.value.trim();
    let categoriaSeleccionada = categoriaTarea.value;

    if (textoTarea === "") {
        mensajeError.textContent = "Por favor escribe una tarea.";
        console.log("Error: el usuario intento agregar una tarea vacia.");
        return;
    }

    if (categoriaSeleccionada === "") {
        mensajeError.textContent = "Por favor selecciona una categoria.";
        console.log("Error: el usuario no selecciono categoria.");
        return;
    }

    if (categoriaSeleccionada === "otra") {
        const otraCategoria = inputOtraCategoria.value.trim();

        if (otraCategoria === "") {
            mensajeError.textContent = "Escribe la categoria.";
            console.log("Error: eligió 'Otra' pero no escribió la categoría.");
            return;
        }

        categoriaSeleccionada = otraCategoria;
    }

    mensajeError.textContent = "";

    const tarea = {
        id: contadorId,
        texto: textoTarea,
        categoria: categoriaSeleccionada,
        hecha: false,
        urgente: false
    };

    tareas.push(tarea);
    total++;
    contadorId++;

    console.log("Tarea agregada correctamente:", tarea);

    inputTarea.value = "";
    categoriaTarea.value = "";
    inputOtraCategoria.value = "";
    inputOtraCategoria.style.display = "none";

    actualizarContador();
    mostrarTareas();
}

function mostrarTareas() {
    listaTareas.innerHTML = "";

    for (let i = 0; i < tareas.length; i++) {
        const tarea = tareas[i];

        let claseTarea = "tarea";

        if (tarea.hecha) {
            claseTarea += " hecha";
        }

        if (tarea.urgente) {
            claseTarea += " urgente";
        }

        listaTareas.innerHTML += `
      <div class="${claseTarea}">
        <p>${tarea.categoria} ${tarea.texto}</p>

        <div class="botonesTarea">
          <button onclick="marcarHecha(${tarea.id})">Hecha</button>
          <button onclick="marcarUrgente(${tarea.id})">Urgente</button>
          <button onclick="eliminarTarea(${tarea.id})">Eliminar</button>
        </div>
      </div>
    `;
    }
}

function marcarHecha(id) {
    for (let i = 0; i < tareas.length; i++) {
        if (tareas[i].id === id) {
            if (tareas[i].hecha === false) {
                tareas[i].hecha = true;
                completadas++;
                console.log("Tarea marcada como hecha:", tareas[i]);
            } else {
                tareas[i].hecha = false;
                completadas--;
                console.log("Tarea desmarcada como hecha:", tareas[i]);
            }
            break;
        }
    }

    actualizarContador();
    mostrarTareas();
}

function marcarUrgente(id) {
    for (let i = 0; i < tareas.length; i++) {
        if (tareas[i].id === id) {
            if (tareas[i].urgente === false) {
                tareas[i].urgente = true;
                console.log("Tarea marcada como urgente:", tareas[i]);
            } else {
                tareas[i].urgente = false;
                console.log("Tarea desmarcada como urgente:", tareas[i]);
            }
            break;
        }
    }

    actualizarContador();
    mostrarTareas();
}

function eliminarTarea(id) {
    const confirmarEliminacion = confirm("¿Deseas eliminar esta tarea?");

    if (!confirmarEliminacion) {
        console.log("El usuario canceló la eliminación.");
        return;
    }

    for (let i = 0; i < tareas.length; i++) {
        if (tareas[i].id === id) {
            if (tareas[i].hecha) {
                completadas--;
            }

            tareas.splice(i, 1);
            total--;
            break;
        }
    }

    actualizarContador();
    mostrarTareas();
}

btnLimpiar.addEventListener("click", limpiarCompletadas);

function limpiarCompletadas() {
    let cantidadCompletadas = 0;

    for (let i = 0; i < tareas.length; i++) {
        if (tareas[i].hecha) {
            cantidadCompletadas++;
        }
    }

    if (cantidadCompletadas === 0) {
        console.log("No hay tareas completadas para eliminar.");
        return;
    }

    const confirmarLimpieza = confirm(
        `Se eliminarán ${cantidadCompletadas} tarea(s) completada(s). ¿Deseas continuar?`
    );

    if (!confirmarLimpieza) {
        console.log("El usuario canceló limpiar completadas.");
        return;
    }

    let tareasPendientes = [];

    for (let i = 0; i < tareas.length; i++) {
        if (!tareas[i].hecha) {
            tareasPendientes.push(tareas[i]);
        }
    }

    tareas = tareasPendientes;
    total = tareas.length;
    completadas = 0;

    console.log("Se limpiaron las tareas completadas.");

    actualizarContador();
    mostrarTareas();
}