

/* --@-- Variables generales para el documento --@-- */

/* -- Urls para uso de de api con fetch -- */
const urlZonas = "http://localhost:3000/api/zonas";
const urlCategoriasRest = "http://localhost:3000/api/categorias";
const urlRestaurantes = "http://localhost:3000/api/restaurantes";

/* -- contantes y variables pantalla inicio direccion de entrega -- */
const selectZonas = document.getElementById("select_zona_entrega");
const inputDireccion = document.getElementById("input_direccion");
const btnComenzar = document.getElementById("btn_comenzar");

/* -- contantes y variables Actualizar direccion de entrega -- */
const contMostrarDireccion = document.getElementById("cont_mostrar_direccion");
const contCambiarDieccion = document.getElementById("cambiar_direccion");
const parrafoDireccion = document.querySelector(".p_direccion");
const selectCambiarZonaEntrega = document.getElementById("select_cambiar_zona_entrega");
const inputCambiarDireccion = document.getElementById("input_cambiar_direccion");
const btnActualizarDireccion = document.getElementById("btn_actualizar_direccion");

/* -- constantes y variables botones  de categorias de restaurantes -- */
const contCategorias = document.getElementById("cont_categorias");

/* -- contsantes y variables botones Restaurantes -- */
const contCategoriaElegida = document.getElementById("cont_categoria_elegida");
const contRestaurantes = document.getElementById("cont_restaurantes");

/* -- Objeto datosCliente: almacenara los datos que necesita el repartidor para realizar el pedido */
const datosCliente = {
    nombre:"",
    zona:"",
    direccion:"",
    restaurante:"",
    productos:[]   
};


/* ----- Enlista las zonas de entrega disponibles en el select de la patalla principal y el de cambio de direccion ----- */
let opcionesZonas = '<option value="0">--Selecione su Zona--</option>';

const cargarZonasEntrega = (options, select) => {
    fetch(urlZonas)
    .then(res => res.json())
    .then(zonas => {
        zonas.forEach(zona => {    
            options += `<option value=${zona.id_zona_entrega}> ${zona.nombre_zona} </option>`  
        });
        select.innerHTML = options;
    });
}
cargarZonasEntrega(opcionesZonas, selectZonas);

/* --@-- evento click del boton comenzar pantalla de inicio --@-- */
btnComenzar.addEventListener("click", () => {
    /* -- constantes y variables obtenidas de los valores del formulario de la pantalla inicial -- */
    let zonaEntregaCliente = selectZonas.options[selectZonas.value].innerHTML;
    let idZona = selectZonas.value;
    let direccionCliente = inputDireccion.value; 
    

    /* -- condicional para validar que no hayan campos vacios -- */
    if(idZona != 0 && direccionCliente !=""){
        /* -- coloca la clase de bootstrap d-none para ocultar pantalla inicial -- */
        let pantallaInicial = document.getElementById("pantalla_inicial");
        pantallaInicial.classList.add("d-none");
        document.body.style.background = "var(--bg-color)";

        /* -- actualiza los valores del obejto obtenidos del primer formulario -- */
        datosCliente.direccion = direccionCliente;
        datosCliente.zona = zonaEntregaCliente;

        /* -- Coloca la direccion dentro del parrafo para mostrarla arriba de la pantalla -- */ /* @@@arrgelar comentario */
        contMostrarDireccion.classList.remove("d-none");
        contCategorias.classList.remove("d-none");
        parrafoDireccion.innerHTML = `${datosCliente.direccion}, ${datosCliente.zona}`;

        /* -- carga nuevamente la lista de zonas en el input para cambiar direccion y coloca los valores elegidos en primer lugar */
        let opcionesZonas = `<option value="0">${datosCliente.zona}</option>`;
        inputCambiarDireccion.value = datosCliente.direccion;
        cargarZonasEntrega(opcionesZonas, selectCambiarZonaEntrega);
    }else{
        alert("porfavor rellena los campos requeridos");
    }
});

/* --@-- evento click del boton Guardar para actualizar la direccion deentrega --@-- */
btnActualizarDireccion.addEventListener("click", () => { 
    let nuevaZonaEntrega = selectCambiarZonaEntrega.options[selectCambiarZonaEntrega.value].innerHTML;
    let nuevoIdZonaEntrega = selectCambiarZonaEntrega.value
    let nuevaDireccionEntrega = inputCambiarDireccion.value;

    if(nuevaDireccionEntrega != ""){

    datosCliente.zona = nuevaZonaEntrega;
    datosCliente.direccion = nuevaDireccionEntrega;

    parrafoDireccion.innerHTML = `${datosCliente.direccion}, ${datosCliente.zona}`;

    contCambiarDieccion.setAttribute("class", "container collapse");
    }else{
        alert("No puede haber campos vacios");
    }
});

/* --@-- Enlista Los botones para las categorias de restaurantes--@-- */
let btnCategoria = "";

fetch(urlCategoriasRest)
.then(res => res.json())
.then(categorias => {
    categorias.forEach(categoria => {    
        btnCategoria += `<button class="btnCategoriaRest item btn rounded-circle mb-3 d-flex flex-column align-items-center justify-content-center">
                            <img class="" src="${categoria.imagen}" width="50">
                            <p class="" m-0 p-0">${categoria.nombre_cate}</p>
                        </button>`
    });
    contCategorias.innerHTML = btnCategoria;  
});

const on = (element, event, selector, handler) =>{
    element.addEventListener(event, e =>{
        if(e.target.closest(selector)){
            handler(e)
        }
    })
};


/* Listar restaurantes despues de pulsar boton categoria */
on (document, "click", ".btnCategoriaRest", e => {
     const elemento = e.target.matches(".btnCategoriaRest")


     let btnRestaurante = "";;
     fetch(urlRestaurantes)
     .then(res => res.json())
     .then(restaurantes => {

   if(elemento){
    let nombreCateElegida = e.target.children[1].innerText;
    contCategoriaElegida.innerHTML = nombreCateElegida;

   }else{
    let btn = e.target.parentNode;
    let nombreCateElegida = btn.children[1].innerText;
    contCategoriaElegida.innerHTML = nombreCateElegida
   }


   restaurantes.forEach(restaurante => {
    let categoriasDelRestaurante = restaurante.categorias;
    let nuevoArrayCategoriasRest = categoriasDelRestaurante.split(", ")
    let buscadorCategoriaArray= nuevoArrayCategoriasRest.includes(contCategoriaElegida.innerHTML);

    if(buscadorCategoriaArray){
        btnRestaurante += `<button class="card btn my-3 p-0">
                                <div class="row g-0">
                                    <div class="col-3">
                                        <img src="src/img/front_page_rest/noimage.png" class="img-fluid rounded-start" alt="...">
                                    </div>
                                    <div class="col-9">
                                        <div class="card-body text-start">
                                        <h5 class="card-title">${restaurante.nombre_rest}</h5>
                                        <p class="card-text">${restaurante.ubicacion}</p>
                                        </div>
                                    </div>
                                </div>
                            </button>`

        contRestaurantes.innerHTML = btnRestaurante;
    }else{
     console.log(`este restaurante ${restaurante.id_restaurante} es de la categoria elegida`);
    } 
 })
});


});

/* enlista Todos los restaurantes */

   


















