const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const listaCursos = document.querySelector('#lista-cursos');
let cursosCarrito = [];

// listaCursos.addEventListener('click',agregarCurso)

function agregarCurso(e){
    e.preventDefault()
   //console.log(e.target.parentElement.parentElement);
   let cursoSeleccionado = e.target.parentElement.parentElement;
   leerDatosCurso(cursoSeleccionado);
}

function leerDatosCurso(curso){

    const infoCurso = {
        id: curso.querySelector('a').getAttribute('data-id'),
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('h5').textContent,
        cantidad: 1
    }

    // Ver si el curso ya existe en ek carrito
    const existe = cursosCarrito.some( curso => curso.id === infoCurso.id)

    if (existe) {
      cursosCarrito.map( curso => {
            if (curso.id === infoCurso.id) {
                curso.cantidad += 1;
            return curso; // Va a dejar el curso en el array actualizado (con cantindad + 1)
            } else {
                return curso; // retornar los cursos que no sean duplicados
            }
        });
    } else {
        cursosCarrito.push(infoCurso);
    }
    pintarCarritoHTML();
}

function pintarCarritoHTML() {

    //Limpies carrito
    limpiarCarritoHTML();

    // Metodo Map = Recorrer el array y devolver o jecutar algo con cada posicion
    cursosCarrito.map( (curso) => {
        

    // Creamos el elemento tr de la tabla
     const fila = document.createElement('tr');
     // Asignamos un valor con innerHTML a esa fila
     fila.innerHTML = `<td> <img src='${curso.imagen}'> </td>
     <td> ${curso.titulo} </td>
     <td> ${curso.precio} </td>
     <td> ${curso.cantidad} </td>
     <td> <a href="#" class="btn btn-danger" data-id="${curso.id}" onclick="deleteItem(event)"></a> </td>
     `;
     

    // Agrego la fila al contenedor del carrito (tbody)
     contenedorCarrito.appendChild(fila)

    } )
}

function limpiarCarritoHTML() {
    while(contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
};

function vaciarCarrito(e) {
    e.preventDefault();
    cursosCarrito = [];
    limpiarCarritoHTML();   
}

function deleteItem(e) {
    e.preventDefault();
    const cursoPorId = e.target.getAttribute('data-id');

    // Busca el index del curso en el array basado en el id
    const CursoQueSeVaRemover = cursosCarrito.findIndex((curso) => curso.id === cursoPorId);

    // Verifica si el curso se ecuentra en el array
    if (CursoQueSeVaRemover !== -1 ) {
        // Aca disminuye la cantidad del curso que se encontro 1 por 1
        cursosCarrito[CursoQueSeVaRemover].cantidad -= 1;
        // Si la cantidad del curso ahora es 0, se remueve del array completamente
     if ( cursosCarrito[CursoQueSeVaRemover].cantidad === 0) {
        cursosCarrito.splice(CursoQueSeVaRemover, 1);
        }
    }
    pintarCarritoHTML();
}