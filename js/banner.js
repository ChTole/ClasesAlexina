const OFERTAS = [
    "20% OFF en productos seleccionados",
    "¡Envío gratis hoy!",
    "6 cuotas sin interés"
]

let temporizador;

function mostrarOferta() {
    // Capturar el contenedor
    let contenedor = document.querySelector('#ofertasBanner');

    if (contenedor.firstChild) {
        contenedor.firstChild.remove();
        clearTimeout(temporizador);
    }

    // Seleccionar "aleatoriamente" una oferta
    let indice = Math.floor(Math.random() * OFERTAS.length);
    let ofertaTxt = OFERTAS[indice]

    // Etiqueta de la oferta
    let pOferta = crearEtiqueta('p', 'oferta', ofertaTxt);
    contenedor.append(pOferta);

    temporizador = setTimeout(
        () => { pOferta.remove() },
        5000
    );
}