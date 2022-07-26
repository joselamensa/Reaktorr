// SOBRE NOSOTROS 


function validar()
{
    var usuario = document.getElementById("usuario").value;
    var Contraseña = document.getElementById("pass").value;	

    if(usuario == "jose" && Contraseña == "1234")
    {
        window.location= "./personaldata.html";
    }
    else
    {   swal({
            title: "Contraseña incorrecta",
            text: "Intente de nuevo",
            icon: "error",
            button: "Atrás",
          });
    }

}


// SHOP ONLINE
document.addEventListener('DOMContentLoaded', () => {

    // Constantes y variables
    const baseDeDatos = [
        {
            id: 1,
            nombre: 'Botella 1 Litro',
            precio: 300,
            imagen: '../imgs/botella/litrodorada.png'
        },
        {
            id: 2,
            nombre: 'Botella Medio Litro',
            precio: 200,
            imagen: '../imgs/botella/medio dorada.png'
        },
        {
            id: 3,
            nombre: 'Botella X-FIT Litro',
            precio: 300,
            imagen: '../imgs/xfit/litroxfit.png'
        },
        {
            id: 4,
            nombre: 'Botella X-FIT Medio Litro',
            precio: 200,
            imagen: '../imgs/xfit/botellaxfit.png'
        }

    ];

    let carrito = [];
    const divisa = '$';
    const DOMitems = document.querySelector('#items');
    const DOMcarrito = document.querySelector('#carrito');
    const DOMtotal = document.querySelector('#total');
    const DOMbotonVaciar = document.querySelector('#boton-vaciar');
    const miLocalStorage = window.localStorage;

    // SHOP Online CARRITO
    function renderizarProductos() {
        baseDeDatos.forEach((info) => {
            // Estructura
            const miNodo = document.createElement('div');
            miNodo.classList.add('card', 'col-sm-4');
            // Body
            const miNodoCardBody = document.createElement('div');
            miNodoCardBody.classList.add('card-body');
            // Titulo
            const miNodoTitle = document.createElement('h5');
            miNodoTitle.classList.add('card-title');
            miNodoTitle.textContent = info.nombre;
            // Imagen
            const miNodoImagen = document.createElement('img');
            miNodoImagen.classList.add('img-fluid');
            miNodoImagen.setAttribute('src', info.imagen);
            // Precio
            const miNodoPrecio = document.createElement('p');
            miNodoPrecio.classList.add('card-text');
            miNodoPrecio.textContent = `${info.precio}${divisa}`;
            // Boton 
            const miNodoBoton = document.createElement('button');
            miNodoBoton.classList.add('btn', 'btn-primary');
            miNodoBoton.textContent = '+';
            miNodoBoton.setAttribute('marcador', info.id);
            miNodoBoton.addEventListener('click', anyadirProductoAlCarrito);
            miNodoBoton.addEventListener(`click`, anyadirBotonCompra);
            // Insertamos
            miNodoCardBody.appendChild(miNodoImagen);
            miNodoCardBody.appendChild(miNodoTitle);
            miNodoCardBody.appendChild(miNodoPrecio);
            miNodoCardBody.appendChild(miNodoBoton);
            miNodo.appendChild(miNodoCardBody);
            DOMitems.appendChild(miNodo);
        });
    }
    function anyadirBotonCompra () {
        document.getElementById("mp").style.display = "block";
    }
    function anyadirProductoAlCarrito(evento) {
        carrito.push(evento.target.getAttribute('marcador'))
        renderizarCarrito();
        // Actualiza el LocalStorage
        guardarCarritoEnLocalStorage();
    }

    function renderizarCarrito() {
        DOMcarrito.textContent = '';
        const carritoSinDuplicados = [...new Set(carrito)];
        carritoSinDuplicados.forEach((item) => {
            const miItem = baseDeDatos.filter((itemBaseDatos) => {
                return itemBaseDatos.id === parseInt(item);
            });
            // Suma de producto
            const numeroUnidadesItem = carrito.reduce((total, itemId) => {
                return itemId === item ? total += 1 : total;
            }, 0);
            const miNodo = document.createElement('li');
            miNodo.classList.add('list-group-item', 'text-right', 'mx-2', `porfa`);
            miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - ${miItem[0].precio}${divisa}`;
            // Boton "X" en productos del carrito
            const miBoton = document.createElement('button');
            miBoton.classList.add('btn', 'btn-danger', 'mx-7');
            miBoton.textContent = 'X';
            miBoton.style.marginLeft = '1rem';
            miBoton.dataset.item = item;
            miBoton.addEventListener('click', borrarItemCarrito);
            miBoton.addEventListener(`click`, eliminarmp);
            miNodo.appendChild(miBoton);
            DOMcarrito.appendChild(miNodo);
        });
        DOMtotal.textContent = calcularTotal();
    }
    function eliminarmp () {
        if (Number(document.getElementById('total').innerText) === 0.00) {
            document.getElementById("mp").style.display = "none";
    }
    }

    function borrarItemCarrito(evento) {
        const id = evento.target.dataset.item;
        // Borramos todos los productos
        carrito = carrito.filter((carritoId) => {
            return carritoId !== id;
        });
        renderizarCarrito();
        // Actualizamos el LocalStorage
        guardarCarritoEnLocalStorage();

    }
    // Calcular precio final
    function calcularTotal() {
        return carrito.reduce((total, item) => {
            const miItem = baseDeDatos.filter((itemBaseDatos) => {
                return itemBaseDatos.id === parseInt(item);
            });
            // Los sumamos al total
            return total + miItem[0].precio;
        }, 0).toFixed(2);
    }

    function vaciarCarrito() {
        // Limpiar productos guardados
        carrito = [];
        renderizarCarrito();
        // Borra LocalStorage
        localStorage.clear();

    }

    function guardarCarritoEnLocalStorage () {
        miLocalStorage.setItem('carrito', JSON.stringify(carrito));
    }

    function cargarCarritoDeLocalStorage () {
        if (miLocalStorage.getItem('carrito') !== null) {
            carrito = JSON.parse(miLocalStorage.getItem('carrito'));
        }
    }

    // Eventos
    DOMbotonVaciar.addEventListener('click', vaciarCarrito);

    // Inicio
    cargarCarritoDeLocalStorage();
    renderizarProductos();
    renderizarCarrito();
    dale ();
});

function dale () {
    if (Number(document.getElementById('total').innerText) === 0.00) {
            document.getElementById("mp").style.display = "none";
    } else {
        document.getElementById("mp").style.display = "block";
    }
}

// INICIAR SESIÓN CON GOOGLE

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  }
function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
    });
    auth2.disconnect();
}


// Calculadora pag oculta

//Funciones on click de numeros
uno.onclick = function (e) {
  resultado.textContent = resultado.textContent + "1";
};
dos.onclick = function (e) {
  resultado.textContent = resultado.textContent + "2";
};
tres.onclick = function (e) {
  resultado.textContent = resultado.textContent + "3";
};
cuatro.onclick = function (e) {
  resultado.textContent = resultado.textContent + "4";
};
cinco.onclick = function (e) {
  resultado.textContent = resultado.textContent + "5";
};
seis.onclick = function (e) {
  resultado.textContent = resultado.textContent + "6";
};
siete.onclick = function (e) {
  resultado.textContent = resultado.textContent + "7";
};
ocho.onclick = function (e) {
  resultado.textContent = resultado.textContent + "8";
};
nueve.onclick = function (e) {
  resultado.textContent = resultado.textContent + "9";
};
cero.onclick = function (e) {
  resultado.textContent = resultado.textContent + "0";
};
reset.onclick = function (e) {
  resetear();
};
suma.onclick = function (e) {
  operandoa = resultado.textContent;
  operacion = "+";
  limpiar();
};
resta.onclick = function (e) {
  operandoa = resultado.textContent;
  operacion = "-";
  limpiar();
};
multiplicacion.onclick = function (e) {
  operandoa = resultado.textContent;
  operacion = "*";
  limpiar();
};
division.onclick = function (e) {
  operandoa = resultado.textContent;
  operacion = "/";
  limpiar();
};
igual.onclick = function (e) {
  operandob = resultado.textContent;
  resolver();
};
function limpiar() {
  resultado.textContent = "";
}
function resetear() {
  resultado.textContent = "";
  operandoa = 0;
  operandob = 0;
  operacion = "";
}

function resolver() {
  var res = 0;
  switch (operacion) {
    case "+":
      res = parseFloat(operandoa) + parseFloat(operandob);
      break;
    case "-":
      res = parseFloat(operandoa) - parseFloat(operandob);
      break;
    case "*":
      res = parseFloat(operandoa) * parseFloat(operandob);
      break;
    case "/":
      res = parseFloat(operandoa) / parseFloat(operandob);
      break;
  }
  resetear();
  resultado.textContent = res;
}
