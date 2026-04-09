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

        listaTareas.innerHTML += `
      <div class="tarea">
        <p>${tarea.categoria} ${tarea.texto}</p>
        
        <button onclick="marcarHecha(${tarea.id})">Hecha</button>
        <button onclick="marcarUrgente(${tarea.id})">Urgente</button>
        <button onclick="eliminarTarea(${tarea.id})">Eliminar</button>
      </div>
    `;
    }
}

function marcarHecha(id) {

}

function marcarUrgente(id) {

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