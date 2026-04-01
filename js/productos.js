// Vista categoría
function mostrarCategorias() {
    // Contenedor de las vistas
    let app = document.getElementById('app');

    // Contenedor de categorías
    let divCategorias = crearEtiqueta('div', 'categories', null);
    
    let subtitulo = crearEtiqueta('h2', 'subtitle', 'Seleccioná una categoría');
    let categorias = [];

    // Filtrado de categorías existentes - Opciones
    estado.productos.forEach(p => {
        if (!categorias.includes(p.categoria)) {
            categorias.push(p.categoria);
        }
    });

    // Opción todas
    categorias.push('Todas');

    let divBotonera = crearEtiqueta('div', 'cmdButton', null);

    // Botones y acciones
    categorias.forEach(c => {
        let btnSeleccionar = crearEtiqueta('button', 'btn', c);
        btnSeleccionar.addEventListener('click', () => {
            limpiarVista();
            mostrarCategorias();
            if (c === 'Todas') { 
                mostrarProductos(null);
                return; // Evita ejecutar el resto de la función
            }
            mostrarProductos(c);
        });

        divBotonera.append(btnSeleccionar);
    });

    // Agrego al contenedor de categorías
    divCategorias.append(subtitulo, divBotonera);

    // Agrego al contenedor de la vista
    app.append(divCategorias);
}

// Vista de productos
function mostrarProductos(categoriaSeleccionada) {
    // Contenedor de las vistas
    let app = document.getElementById('app');

    // Contenedor de productos
    let divProductos = crearEtiqueta('div', 'productos', null);
    
    // Mostrar oferta
    if (categoriaSeleccionada !== null) {
        mostrarOferta();
    }

    estado.productos.forEach(p => {
        // Filtrado de categoría

        if (p.categoria === categoriaSeleccionada || !categoriaSeleccionada) {

            // Tarjeta de cada producto - cambiar por li
            let divTarjeta = crearEtiqueta('div', 'producto', null);
    
            // Contenido de la tarjeta
            let imagen = crearEtiqueta('img', 'card-img', null);
            imagen.src = `${PRODUCTOS_URL}${p.imagen}`;
            imagen.alt = p.nombre;
    
            let nombre = crearEtiqueta('h3', 'card-title', p.nombre);
            let descripcion = crearEtiqueta(
                                'p', 
                                'card-desc', 
                                p.descripcion.substring(0, 15) + '...'
            );
            let precio = crearEtiqueta('p', 'bold', `$${p.precio}`);
            let categoria = crearEtiqueta('p', 'category', p.categoria);
    
            // Acciones
            let botonera = crearEtiqueta('div', 'cmdButton', null);
            let btnAmpliar = crearEtiqueta('button', 'btn', 'Ampliar');
            btnAmpliar.addEventListener('click',() => {
                ampliarProducto(p);
            });

            let btnAgregar = crearEtiqueta('button', 'btn', 'Agregar');
            btnAgregar.addEventListener('click', () => {
                agregarAlCarrito(p.id);
            });
    
            botonera.append(btnAmpliar, btnAgregar);
    
            // Agrego contenido a la tarjeta
            divTarjeta.append(
                imagen,
                nombre,
                descripcion,
                precio,
                categoria,
                botonera
            );

            divProductos.append(divTarjeta);
        }

        // Agrego al contenedor de productos
        // if (!categoriaSeleccionada) {
        //     divProductos.append(divTarjeta);
        // }    
        // // Filtro separado
        // else if (p.categoria === categoriaSeleccionada) {
        //     divProductos.append(divTarjeta);
        // }
    });

    // Agrego a la vista
    app.append(divProductos);
}

// Vista de la ampliación del producto
function ampliarProducto(producto) {
    let app = document.getElementById('app');

    let modalProducto = crearEtiqueta('dialog', 'modal-producto', null);

    let imgProducto = crearEtiqueta('img', 'img-producto', null);
    imgProducto.src = `${PRODUCTOS_URL}${producto.imagen}`;
    let h3nombre = crearEtiqueta('h3', 'titulo-prod', producto.nombre);
    let pDescripcion = crearEtiqueta('p', 'descr-prod', producto.descripcion);
    let pPrecio = crearEtiqueta('p', 'precio-prod', `$${producto.precio}`);
    let pCategoria = crearEtiqueta('p', 'cat-prod', producto.categoria);

    let botonera = crearEtiqueta('div', 'cmdButton', null);
    let btnCerrar = crearEtiqueta('button', 'btn', 'Cerrar');
    btnCerrar.addEventListener('click', () =>{
        modalProducto.close();
        modalProducto.remove();
    });

    botonera.append(btnCerrar);

    modalProducto.append(
        imgProducto,
        h3nombre,
        pDescripcion,
        pPrecio,
        pCategoria,
        botonera
    );

    app.append(modalProducto);
    modalProducto.showModal();
}