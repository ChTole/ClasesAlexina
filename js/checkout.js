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
    ]

    // Versión escalada
    formFields.forEach(field => {
        let divForm = crearEtiqueta('div', 'formInput', null);
        let formLabel = crearEtiqueta('label', null, field.label);
        formLabel.for = field.id;
    
        let formInput = crearEtiqueta('input', null, null);
        formInput.id = field.id;
        formInput.name = field.id;
        formInput.type = field.type;

        let pError = crearEtiqueta('p', 'error', null);
        
        formInput.addEventListener('input', () => {
            if (formInput.value === '')
                pError.textContent = 'Este campo es obligatorio.';
            else
                pError.textContent = '';
        });
    
        divForm.append(formLabel, formInput, pError);

        form.append(divForm);
    });
    
    dialogCheckout.append(form);

    app.append(dialogCheckout);

    dialogCheckout.showModal();

    "123abc"
    "#$GSGA"
    "1155228866"
    "abc 123  L4pr1da 381 1757"
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