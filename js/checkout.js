const FORM_FIELDS = [
    {
        id: "fullName",
        label: "Nombre y Apellido",
        type: "text"
    },
    {
        id: "email",
        label: "Correo",
        type: "email"
    },
    {
        id: "phone",
        label: "Teléfono",
        type: "text"
    },
    {
        id: "location",
        label: "Lugar de Entrega",
        type: "text"
    },
    {
        id: "deliveryDate",
        label: "Fecha de Entrega",
        type: "date"
    },
    {
        id: "payment",
        label: "Método de pago",
        type: "options",
        options: [
            {
                value: "credit",
                label: "Tarjeta de crédito"
            },
            {
                value: "debit",
                label: "Tarjeta de débito"
            },
            {
                value: "transfer",
                label: "Transferencia"
            }
        ]
    }
]


function createCheckoutForm() {
    // Dibujar el form en el DOM
    
    // Capturar contenedor de la app
    let app = document.querySelector('#app');

    // Modal contenedor
    let dialogCheckout = crearEtiqueta('dialog', 'checkoutDialog', null);

    // Formulario
    let form = crearEtiqueta('form', 'checkoutForm', null);


    // Versión escalada
    FORM_FIELDS.forEach(field => {
        let divForm = crearEtiqueta('div', 'formInput', null);
        let formLabel = crearEtiqueta('label', null, field.label);
        formLabel.setAttribute('for', field.id);
    
        // Declaración sin inicialización
        let formInput;

        if (field.type === "options" && field.options) {
            // No es input, es select
            formInput = crearEtiqueta('select', null, null); // inicialización
            formInput.id = field.id;
            formInput.name = field.id;

            let firstOption = crearEtiqueta('option', null, "Seleccione una opción");
            firstOption.selected = true;
            firstOption.disabled = true;
            firstOption.value = null;
            formInput.append(firstOption);

            field.options.forEach(op => {
                let option = crearEtiqueta('option', null, op.label);
                option.value = op.value;
                formInput.append(option);
            });
        }
        else {
            // Es input
            formInput = crearEtiqueta('input', null, null); // inicialización
            formInput.id = field.id;
            formInput.name = field.id;
            formInput.type = field.type;
        }

        let pError = crearEtiqueta('p', 'error', null); 
         
        divForm.append(formLabel, formInput, pError);

        form.append(divForm);
    });

    // Botonera
    let divCmdButton = crearEtiqueta('div', 'cmdButton', null);

    let btnSubmit = crearEtiqueta('button', 'btn', 'Confirmar');
    btnSubmit.type = 'submit';
    
    let btnCancel = crearEtiqueta('button', 'btn', 'Cancelar');
    btnCancel.type = 'button';
    btnCancel.addEventListener('click', () => {
        dialogCheckout.close();
        dialogCheckout.remove();
    });
    
    divCmdButton.append(btnSubmit, btnCancel);
    form.append(divCmdButton);

    let title = crearEtiqueta('h3', 'formTitle', 'Finalizar compra');
    let errorForm = crearEtiqueta('p', 'errorForm', null);

    dialogCheckout.append(title, form, errorForm);

    app.append(dialogCheckout);

    // ********************************************
    // El form ya pertenece al DOM
    // ********************************************
    // Primera validación de inputs
    formInputsAll = document.querySelectorAll('.formInput');
    formInputsAll.forEach(formCont => {
        let input = formCont.querySelector('input');
        let pError = formCont.querySelector('p.error');

        if (!input) {
            // Si no es input => select
            input = formCont.querySelector('select');
            // La primera aparición
            if (input.value == "null") {
                pError.textContent = 'Este campo es obligatorio.';
            }
 
            // Escuchar el ingreso
            input.addEventListener('change', () => {
                if (input.value == "null") {
                    pError.textContent = 'Este campo es obligatorio.';
                }
                else {
                    pError.textContent = '';
                }
            });
        }
        else {
            // Es input
            // La primera aparición
            if (input.value === '') {
                pError.textContent = 'Este campo es obligatorio.';
            }
 
            // Escuchar el ingreso
            input.addEventListener('input', () => {
                if (input.value === '') {
                    pError.textContent = 'Este campo es obligatorio.';
                }
                else {
                    pError.textContent = '';
                }
            });
        }
    });

    // Envío del formulario
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        onSubmit(form);
    });

    dialogCheckout.showModal();
}

function onSubmit(form) {
    // Creación de obj FormData (objeto nativo)
    let formSent = new FormData(form)

    // Mensaje de error en form
    let pErrorForm = document.querySelector('p.errorForm');
    pErrorForm.textContent = '';
    
    // Validar datos
    // console.log(formSent.get('fullName')) // un campo a partir del "name"
    for (let f of formSent.values()) {
        // console.log(f); // valores del form
        if (f === '' || f === "null") {
            pErrorForm.textContent = "Se detectaron errores en el formulario."
            return;
        }
    }

    // Caso "feliz" -> datos validados correctamente
    // Captura del modal del form, cierre y eliminación del DOM
    let dialogCheckout = document.querySelector('.checkoutDialog');
    dialogCheckout.close();
    dialogCheckout.remove();

    let dataForm = [];
    
    formSent.entries().forEach(d => {dataForm.push(d)});

    sendData(dataForm);
}

function sendData(validatedFormEntries) {
    // Envío de datos validados correctamente
    let dataUser = {};

    for (let entrie of validatedFormEntries) {
        dataUser[entrie[0]] = entrie[1];
    }

    // Capturar la app
    let app = document.querySelector('#app');
    // Modal
    let dialogPurchase = crearEtiqueta('dialog', null, null);
    // Contenedor dentro del modal
    let container = crearEtiqueta('div', 'purchase', null);

    let subtitle1 = crearEtiqueta('h3', 'purchaseTitle', 'Datos comprador');
    container.append(subtitle1);

    for (let f of FORM_FIELDS) {
        let pField = crearEtiqueta(
            'p',
            'purchaseData',
            `${f.label}: ${dataUser[f.id]}`
        );
        container.append(pField);
    }

    let subtitle2 = crearEtiqueta('h3', 'purchaseTitle', 'Artículos');
    container.append(subtitle2);

    let total = 0;

    // Mostrar de nuevo el carrito y luego vaciar
    estado.carrito.forEach(item => {
        let divItem = crearEtiqueta('div', 'itemCarrito', null);

        let subtotal = item.cantidad * item.producto.precio;
        total += subtotal;

        let spanProducto = crearEtiqueta(
            'span', 
            'itemCarrito', 
            `${item.producto.nombre} | Cantidad: ${item.cantidad} | Subtotal: S${subtotal}`
        );

        divItem.append(spanProducto);
        container.append(divItem);
    });

    vaciarCarrito();

    let pTotal = crearEtiqueta(
        'p', 
        'mount',
        `Total a pagar: $${total}.-`
    );
    container.append(pTotal);

    dialogPurchase.append(container);
    app.append(dialogPurchase);

    dialogPurchase.showModal();

}