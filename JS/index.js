//Modulo donde se realizan las peticiones del front
import { renderCard } from './components/card.js';
import { dropMenu } from './components/dropMenu.js';

let productList = []; //se inicializa una variable vacia para que esta quede fuera del scope de las peticions html
const spinner = document.querySelector("#spinner"); //spinner mientras cargan las peticiones


$.ajax({
    url: "https://bsaletestgermandegalvez.herokuapp.com/getProductsById", //se obtienen todos los productos
    type: 'GET',
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    success: function(res) {
        productList = res;
        setTimeout( () => renderCard(productList), 500); //se ejecuta funcion que renderiza las tarjetas
                                                 //settimeout para que se aprecie el estilo de carga 
    },
    error: function (xhr, ajaxOptions, thrownError){
        console.error(xhr, 'xhr');
        console.error(ajaxOptions, 'ajaxopt');
        console.error(thrownError, 'throerror');
    }
});

//Esta funcion hace una peticion para obetener las categorias y rellenar el select
$.ajax({
    url: "https://bsaletestgermandegalvez.herokuapp.com/getCategories",
    type: 'GET',
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    success: function(res) {
        dropMenu(res); //se llama la funcion que que genera los selects
    },
    error: function (xhr, ajaxOptions, thrownError){
        console.error(xhr, 'xhr');
        console.error(ajaxOptions, 'ajaxopt');
        console.error(thrownError, 'throerror');
    }
});

//funcion que busca segun palabra ingresada
function postWord( value ) {
    const word =  {word: `${value}`}
    $.ajax({
        url: "https://bsaletestgermandegalvez.herokuapp.com/getProductsByWord",
        type: 'POST',
        dataType: 'json',
        data: word,
        success: function(res) {
            productList = res;
            spinner.style.display = "block";
            document.getElementById('stencil').innerHTML = '';
            setTimeout( () => renderCard(productList), 500);
    },
        error: function ( xhr, ajaxOptions, thrownError ) {
            notFoundAlert();
            document.getElementById("value").value = "";
        } 
    });
}

//Se captura el elemento html del formulario y se le asigna una función
document.getElementById("formulario").addEventListener("click", function(event){
    event.preventDefault();
    let value = document.getElementById("value").value;
    if (value === ""){
        notWordAlert();
    } else {
        postWord(value);
    }
  });

//Se captura el elemento html del select y se le asigna una función
document.getElementById("select").addEventListener("change", function(){
    let value = document.getElementById("select").value;
    postWord(value);
  });

//Select que controla la funcionalidad del select order
document.getElementById("order").addEventListener("change", function(){
      ordenar(productList);
});

 //Funcion para ordenar el arreglo segun valor seleccionado
function ordenar(response) {
    let value = document.getElementById("order").value;
    spinner.style.display = "block";
    switch (value) {

        case 'alfabetic':
            document.getElementById('stencil').innerHTML = '';
            setTimeout( () => renderCard(
                response.sort(function (a, b) {
                    if (a.name > b.name) {
                    return 1;
                    }
                    if (a.name < b.name) {
                    return -1;
                    }
                    return 0;
                })
            ) , 200);
        break;

        case 'priceAsc':
            document.getElementById('stencil').innerHTML = '';      
            setTimeout( () => renderCard(response.sort((a,b)=>a.price-b.price)), 200);
        break;

        case 'priceDesc':
            document.getElementById('stencil').innerHTML = '';      
            setTimeout( () => renderCard(response.sort((a,b)=>b.price-a.price)), 200);
        break;
    }
};
    
