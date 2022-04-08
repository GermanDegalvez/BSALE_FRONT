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
                                                 //settimeout para que se aprecie el estilo de carga   
       
    },
    error: function (xhr, ajaxOptions, thrownError){
        console.log(xhr, 'xhr');
        console.log(ajaxOptions, 'ajaxopt');
        console.log(thrownError, 'throerror');
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
            spinner.style.display = "block";
            document.getElementById('stencil').innerHTML = '';
            setTimeout( () => renderCard(res), 500);
    },
        error: function ( xhr, ajaxOptions, thrownError ) {
            notFoundAlert();
            document.getElementById("value").value = "";
            console.log(xhr, 'xhr');
            console.log(ajaxOptions, 'ajaxopt');
            console.log(thrownError, 'throerror');
        } 
    });
}


document.getElementById("formulario").addEventListener("click", function(event){
    event.preventDefault();
    let value = document.getElementById("value").value;
    if (value === ""){
        notWordAlert()
    } else {
        postWord(value);
    }
  });

document.getElementById("select").addEventListener("change", function(){
    let value = document.getElementById("select").value;
    postWord(value);
  });

 

