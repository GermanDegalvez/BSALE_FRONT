//Modulo donde se realizan las peticiones del front
import { renderCard } from './components/card.js';
import { dropMenu } from './components/dropMenu.js';

const spinner = document.querySelector("#spinner"); //spinner mientras cargan las peticiones

$.ajax({
    url: "https://bsaletestgermandegalvez.herokuapp.com/getProductsById", //se obtienen todos los productos
    type: 'GET',
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    success: function(res) {
       
        setTimeout( () => renderCard(res), 500); //se ejecuta funcion que renderiza las tarjetas
                                                 //settimeout para que se parecie el estilo de carga   
       
    },
    error: function (xhr, ajaxOptions, thrownError){
        console.log(xhr, 'xhr');
        console.log(ajaxOptions, 'ajaxopt');
        console.log(thrownError, 'throerror');
        document.write('internal server error')
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
        console.log(xhr, 'xhr');
        console.log(ajaxOptions, 'ajaxopt');
        console.log(thrownError, 'throerror');
        document.write('internal server error')
    }
});


//funcion que busca segun palabra ingresada
let selectedValue = ""; //esta variable se define con el fin de evitar peticiones innecesarias debido al funcionamiento del select
function postWord( value ) {
    if(value === "sin valor" || value === selectedValue){ //control de comportamiento del select
        return;
    }
    const word =  {word: `${value}`}
    $.ajax({
        url: "https://bsaletestgermandegalvez.herokuapp.com/getProductsByWord",
        type: 'POST',
        dataType: 'json',
        data: word,
        success: function(res) {
            spinner.style.display = "block";
            document.getElementById('stencil').innerHTML = '';
            selectedValue = value;
            setTimeout( () => renderCard(res), 500);
    },
        error: function ( xhr, ajaxOptions, thrownError ) {
            alert('No se han encontrado resultados para su busqueda. Por favor intente otra palabra.');
            console.log(xhr, 'xhr');
            console.log(ajaxOptions, 'ajaxopt');
            console.log(thrownError, 'throerror');
            document.write('internal server error')
            
        } 
    });
}


document.getElementById("formulario").addEventListener("click", function(event){
    event.preventDefault();
    let value = document.getElementById("value").value;
    postWord(value);
  });

document.getElementById("select").addEventListener("click", function(){
    let value = document.getElementById("select").value;
    postWord(value);

  });


 