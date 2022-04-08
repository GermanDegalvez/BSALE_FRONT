//Modulo que contiene la funcion que renderiza cada tarjeta dependiendo de los productos
//En esta función tambien se controla el comportamiento del spinner
const spinner = document.querySelector("#spinner");


function renderCard( products ) {
  products.forEach(element => {
    //Hay imagenes cuyos link estan caidos, por lo que se controla este error 
    //y se renderiza una imagen de "Imagen no encontrada" 
    let imagen = '';
    if( element.url_image === null || element.url_image === '' ){ 
      imagen = "https://blogdigital.es/wp-content/uploads/2015/09/imagen-no-encontrada.jpg"
    }  else {
      imagen = `${element.url_image}`;
    }
    $("#stencil").append(`
    <div class="col-md-3 col-sm-6 my-2 d-flex animate__animated animate__fadeInLeft animate__fast	1000ms">
      <div class="card" style="width: 300px;">
      <div class="card-body">
        <img style="height: 17em;" src=${imagen} class="card-img-top" alt="">
          <h5  class="card-text">${element.name}</h5>
        </div>
        <hr>
        <div class="px-3">
        <div class="float-start">
          <p class="text-muted">$${element.price}</p>
          </div>
            <div class="float-end">
              <button type="button" class="btn btn-secondary rounded-circle" onclick="cartAlert()">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart-plus-fill" viewBox="0 0 16 16">
                <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM9 5.5V7h1.5a.5.5 0 0 1 0 1H9v1.5a.5.5 0 0 1-1 0V8H6.5a.5.5 0 0 1 0-1H8V5.5a.5.5 0 0 1 1 0z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
    </div>
  `);
  });
  spinner.style.display = "none";
}

  export { renderCard };
