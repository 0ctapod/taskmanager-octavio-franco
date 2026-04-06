function agregarTarea() {

    const inputTitulo = document.getElementById("tituloTarea");
    const selectCategoria = document.getElementById("categoriaTarea");
    const tarea = { categoria: selectCategoria.value, titulo: inputTitulo.value, Hecho: false, Urgente: false };
    console.log(tarea);
    return tarea;
}

function mostrarCard(listaDeTareas) {
    const divListaDeCards = document.getElementById("listaTareas");
    divListaDeCards.innerHTML = "";
    for (const task of listaDeTareas) {
        // console.log(task);
        divListaDeCards.innerHTML += `
            <div class="card">
            <div class ="card_header">
                <div class="icono">${task.categoria}</div>
                <div class="titulo">${task.titulo}</div>
            </div>
            <div class = "botones">
                <button class="hecho">Hecho</button>
                <button class="urgente">Urgente</button>
                <button class="eliminar">🗑️ Eliminar</button>
            </div>
        </div>`
    }

}

function main() {
    const listaDeTareas = []


    const botonAgregar = document.getElementById("agregarTarea");

    if (botonAgregar) {
        console.log("asdas");
        botonAgregar.addEventListener("click", function event() {
            const tarea = agregarTarea();
            if (tarea) {
                listaDeTareas.push(tarea);
                mostrarCard(listaDeTareas);
                console.log("asdfas", listaDeTareas);
            }
        });

    }
    console.log(listaDeTareas);
    mostrarCard(listaDeTareas);


}

main();