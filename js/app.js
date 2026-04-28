'use strict';
function iniciarProductos(datosProductos) {
    // Versión simplificada con método nativo
    estado.productos = datosProductos.map(p => {
        return new Producto(
            p.id,
            p.nombre,
            p.descripcion,
            p.precio,
            p.imagen,
            p.categoria
        )
    });
}

function iniciar() {
    // Inicializar el estado
    iniciarProductos(PRODUCTOS);
    // Resumen de carrito
    actualizarResumenCarrito();
    // Renderizar productos, categorías...
    mostrarCategorias();
    mostrarProductos(estado.vistaInicial);
}

document.addEventListener('DOMContentLoaded', iniciar);