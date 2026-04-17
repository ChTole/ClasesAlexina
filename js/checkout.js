// <form id="checkout">
//     <div class="formInput">
//         <label for="name">Nombre y Apellido</label>
//         <input id="name" name="fullName" type="text">
//         <p class="error"></p>
//     </div>
//     <div class="formInput">
//         <label for="phone">Teléfono</label>
//         <input id="phone" name="phone" type="text">
//         <p class="error"></p>
//     </div>
//     <div class="formInput">
//         <label for="email">Correo</label>
//         <input id="email" name="email" type="text">
//         <p class="error"></p>
//     </div>
//     <div class="formInput">
//         <label for="location">Lugar de entrega</label>
//         <input id="location" name="location" type="text">
//         <p class="error"></p>
//     </div>
//     <div class="formInput">
//         <label for="deliveryDate">Fecha de entrega</label>
//         <input id="deliveryDate" name="deliveryDate" type="date">
//         <p class="error"></p>
//     </div>
//     <div class="formInput">
//         <label for="payment">Método de pago</label>
//         <select name="payment" id="payment">
//             <option selected disabled>Seleccione</option>
//             <option value="credit">Tarjeta de Crédito</option>
//             <option value="debit">Tarjeta de Débito</option>
//             <option value="transfer">Transferencia</option>
//         </select>
//         <p class="error"></p>
//     </div>
//     <div class="cmdButton">
//         <button type="submit">
//             Confirmar
//         </button>
//         <button type="button" id="cancelCheckout">
//             Cancelar
//         </button>
//     </div>
// </form>

function createCheckoutForm() {
    // Dibujar el form en el DOM
    
    // Capturar contenedor de la app
    let app = document.querySelector('#app');

    // Modal contenedor
    let dialogCheckout = crearEtiqueta('dialog', 'checkoutDialog', null);

    // Formulario
    let form = crearEtiqueta('form', 'checkoutForm', null);

    const formFields = [
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

    // Versión escalada
    formFields.forEach(field => {
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
        
        // formInput.addEventListener('input', () => {
        //     if (formInput.value === '')
        //         pError.textContent = 'Este campo es obligatorio.';
        //     else
        //         pError.textContent = '';
        // });
    
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

    dialogCheckout.append(form);

    app.append(dialogCheckout);

    // El form ya pertenece al DOM
    formInputsAll = document.querySelectorAll('.formInput');
    formInputsAll.forEach(formCont => {
        let input = formCont.querySelector('input');

        if (!input)
            input = formCont.querySelector('select');

        let pError = formCont.querySelector('p.error');
        
        if (input.value === '')
            pError.textContent = 'Este campo es obligatorio.';
        else
            pError.textContent = '';

    });

    dialogCheckout.showModal();

    // Versión XXL
    // let divFormName = crearEtiqueta('div', 'formInput', null);
    // let formLabelName = crearEtiqueta('label', null, 'Nombre y Apellido');
    // formLabelName.for = 'name';

    // let formInputName = crearEtiqueta('input', null, null);
    // formInputName.id = 'name';
    // formInputName.name = 'name';
    // formInputName.type = 'text';

    // let pErrorName = crearEtiqueta('p', 'error', null);

    // divFormName.append(formLabelName, formInputName, pErrorName);
}

function onSubmit() {
    // Validar datos
}

function sendData() {
    // Envío de datos validados correctamente
}