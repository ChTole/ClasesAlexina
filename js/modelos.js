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