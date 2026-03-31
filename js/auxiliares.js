function crearEtiqueta(etiqueta, clase, texto) {
    // Parámetros:
    // etiqueta: string (tag)
    // clase: string (className)
    // texto: string (textContent)

    let nuevaEtiqueta = document.createElement(etiqueta);
    if (clase) nuevaEtiqueta.className = clase;
    if (texto) nuevaEtiqueta.textContent = texto;

    return nuevaEtiqueta;
}

// let nombreProd = document.createElement('p'):
// nombreProd.className = 'producto';
// nombreProd.textContent = 'Monitor 24"';

// let nombreProd = crearEtiqueta('p', 'producto', "Monitor 24"');

function limpiarVista() {
    let app = document.querySelector('#app');

    while(app.firstChild) {
        app.removeChild(app.firstChild);
    }
}