function cartAlert() {
    Swal.fire({
        title: 'El producto se ha agregado a tu carrito de compras!',
        text: 'Continua con tu compra.',
        showClass: {
            popup: 'animate__animated animate__bounceIn'
          },
          hideClass: {
            popup: 'animate__animated animate__bounceOut'
          },
        icon: 'success',
        confirmButtonText: 'Aceptar'
      })
}
function notFoundAlert() {
    Swal.fire({
        title: 'No se han encontrado resultados para su busqueda.',
        text: 'Por favor intente otra palabra.',
        icon: 'warning',
        confirmButtonText: 'Aceptar'
      })
}

function notWordAlert() {
    Swal.fire({
        title: 'Debes ingresar una palabra.',
        text: '',
        icon: 'warning',
        confirmButtonText: 'Aceptar'
      })
}
