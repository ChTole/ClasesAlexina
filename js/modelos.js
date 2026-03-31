// Funciones constructoras
function Producto(id, nombre, descripcion,precio, imagen, categoria){
    // Atributo = Argumento
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.precio = precio;
    this.imagen = imagen;
    this.categoria = categoria;
}

function ItemCarrito(cantidad, producto) {
    this.cantidad = cantidad;
    this.producto = producto;
}

// let p1 = new Producto(
//     15,
//     "Disco SSD",
//     "1Tb",
//     200000,
//     "img/ssd.jpg",
//     "Almacenamiento"
// );

// console.log(p1);
// console.log(typeof p1);
// console.log(p1 instanceof Producto);