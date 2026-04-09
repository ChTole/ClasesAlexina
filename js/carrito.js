// Actualizar resumen del carrito: <cantidad> productos - $<total> a pagar
function actualizarResumenCarrito() {
    // Capturar el contenedor
    let divResumen = document.querySelector('#resumenCarrito');

    // Actualizo estado.carrito
    obtenerCarrito();

    // Limpiar contenedor
    while (divResumen.firstChild) {
        divResumen.removeChild(divResumen.firstChild)
    }

    // Crear contenido
    let cantProductos = 0;
    let totalCompra = 0;

    if (estado.carrito.length > 0) {
        estado.carrito.forEach(item => {
            let subtotal = item.cantidad * item.producto.precio;
            totalCompra+=subtotal;
            cantProductos+=item.cantidad;
        });
    }

    let spanCantidad = crearEtiqueta('span', null, `${cantProductos} productos -`);
    let spanTotal = crearEtiqueta('span', null, `$${totalCompra} a pagar.`);
    let btnVerCarrito = crearEtiqueta('button', 'boton', 'Ver carrito');
    btnVerCarrito.addEventListener('click', () => {
        mostrarCarrito();
    });

    divResumen.append(spanCantidad, spanTotal, btnVerCarrito);
}

// Agregar productos
// localStorage Vs sessionStorage
// LS: persiste luego de cerrar la ventana (no incógnito).
// SS: persiste mientras esté la ventana abierta.
function agregarAlCarrito(idProducto){
    // Capturar el Producto
    const productoSeleccionado = estado.productos.find(p => p.id === idProducto);

    // Evalúo existencia en el carrito
    const existe = estado.carrito.find(item => item.producto.id === productoSeleccionado.id);

    if (existe) {
        existe.cantidad++;
    }
    else {
        estado.carrito.push(new ItemCarrito(1, productoSeleccionado));
    }

    guardarCarrito();
    actualizarResumenCarrito();
}

// Obtener carrito desde el localStorage
function obtenerCarrito() {
    estado.carrito = JSON.parse(localStorage.getItem('carrito'));
    
    if (!estado.carrito) estado.carrito = [];
}

// Guardar el estado.carrito en localStorage
function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(estado.carrito));
}

// Mostrar el carrito
function mostrarCarrito() {
    // Capturar contenedor app
    let app = document.querySelector('#app');

    // Creación de modal
    let dialogCarrito = crearEtiqueta('dialog', 'modal', null);

    // Contenido:
    
    // Productos + Botón eliminar item
    if (estado.carrito.length > 0) {
        estado.carrito.forEach(item => {
            let divItem = crearEtiqueta('div', 'itemCarrito', null);
    
            let subtotal = item.cantidad * item.producto.precio;
            let spanProducto = crearEtiqueta(
                'span', 
                'itemCarrito', 
                `${item.producto.nombre} | Cantidad: ${item.cantidad} | Subtotal: S${subtotal}`
            );
            let btnEliminar = crearEtiqueta('button', 'boton', '🗑️');
            divItem.append(spanProducto, btnEliminar);
            dialogCarrito.append(divItem);
        });
    }
    else {
        let pMensaje = crearEtiqueta('p', 'advertencia', 'No se seleccionaron productos.');
        dialogCarrito.append(pMensaje);
    }

    // Botonera: "Finalizar" | "Continuar comprando" | "Vaciar el carrito"
    let botonera = crearEtiqueta('div', 'botonera', null);

    let btnFinalizar = crearEtiqueta('button', 'boton', 'Finalizar compra');
    let btnContinuar = crearEtiqueta('button', 'boton', 'Continuar comprando');
    btnContinuar.addEventListener('click', () => {
        dialogCarrito.close();
        dialogCarrito.remove();
    });

    let btnVaciar = crearEtiqueta('button', 'boton', 'Vaciar carrito');
    btnVaciar.addEventListener('click', () => {
        vaciarCarrito();
        dialogCarrito.close();
        dialogCarrito.remove();
    });

    botonera.append(btnContinuar);

    if (estado.carrito.length > 0)
        botonera.append(btnFinalizar, btnVaciar);
    
    dialogCarrito.append(botonera);

    app.append(dialogCarrito);
    dialogCarrito.showModal();
}

// Quitar productos
function quitarDelCarrito() {}

// Vaciar el carrito
function vaciarCarrito() {
    estado.carrito = [];
    guardarCarrito();
    actualizarResumenCarrito();
}
