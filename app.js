const contenidoCarrito = document.getElementById ("carritoContJS");
const verCarrito = document.getElementById ("verCarrito")
const modalContainer = document.getElementById ("modal-container")
const cantidadCarrito = document.getElementById ("cantidadCarrito")

/** Carrito va a ser lo que se guardo en el storage y || en el caso de que el usuario no haya añadido o borrado los productos */

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

/** Aca renderiza los Juegos del Array de Objetos y los pushea al array carrito */

videoJuegos.forEach((videoJuego) => {
    let contenido = document.createElement ("div");
    contenido.className = "card"
    contenido.innerHTML = `
    <img src="${videoJuego.img}">
    <h3>${videoJuego.nombre}</h3>
    <p class="Precio">${videoJuego.precio}$</p>
    `
    contenidoCarrito.appendChild(contenido)

    let comprar = document.createElement ("button");
    comprar.innerText = "Añadir al Carrito";
    comprar.className = "comprar"
    
    contenido.appendChild (comprar)

    comprar.addEventListener ("click", () =>{
        /** Añadi una libreria al hacer click salta el cartel que se agrego al carrito */
        Toastify({
            text: "PRODUCTO AGREGADO",
            duration: 3000,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
              background: "linear-gradient(180deg, #000000, #0e0419, #14082b, #150b3d, #140b51, #0f0b65, #01097a)",
              borderRadius: "2rem",
              fontSize: "0,75rem"
            },
            offset: {
                x: '2rem', // horizontal axis - can be a number or a string indicating unity. eg: '2em'
                y: '7rem' // vertical axis - can be a number or a string indicating unity. eg: '2em'
              },
            onClick: function(){} // Callback after click
          }).showToast();

        const repetirJuego = carrito.some ((repetirProducto) => repetirProducto.id === videoJuego.id)
        
        /** Hice la aplicacion de Ternarios aca */

        if (repetirJuego === true) {
            carrito = carrito.map((juego) =>
                juego.id === videoJuego.id
                    ? { ...juego, cantidad: juego.cantidad + 1 }
                    : juego
            );
        }else {
        carrito.push({
            id: videoJuego.id,
            img: videoJuego.img,
            nombre: videoJuego.nombre,
            precio: videoJuego.precio,
            cantidad: videoJuego.cantidad,
        });
        carritoContador();
        localStorageGuardar();
        }
    })
})

/** Funcion de Guardar los Productos en el Local Storage */
const localStorageGuardar = () =>{
localStorage.setItem ("carrito", JSON.stringify(carrito));
}


