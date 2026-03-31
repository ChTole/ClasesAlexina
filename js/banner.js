const OFERTAS = [
    "20% OFF en productos seleccionados",
    "¡Envío gratis hoy!",
    "6 cuotas sin interés"
]

let temporizador;

function mostrarOferta() {
    // Capturar el contenedor
    let contenedor = document.querySelector('#ofertasBanner');
    // <div id="ofertasBanner"></div>

    if (contenedor.firstChild) {
        // <div id="ofertasBanner">
        // <p>OFERTA ANTERIOR</p>
        // </div>
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