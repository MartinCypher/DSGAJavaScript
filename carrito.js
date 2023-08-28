const pintarCarrito = () => {
    modalContainer.innerHTML= "";
    modalContainer.style.display = "flex"
    const modalHeader = document.createElement ("div")
    modalHeader.className = "modal-header"
    modalHeader.innerHTML = `
    <h1 class="modal-header-tittle">Carrito</h1>
    `;

    modalContainer.appendChild (modalHeader)

    let modalButton = document.createElement ("h1");
    modalButton.innerText = "x";
    modalButton.className = "modal-header-button";

    modalButton.addEventListener("click", () => {
        modalContainer.style.display = "none";
    });

    modalHeader.appendChild (modalButton);


    carrito.forEach((videoJuego) =>{
        let carritoContent = document.createElement ("div")
        carritoContent.className = "modal-content"
        carritoContent.innerHTML = `
        <img src="${videoJuego.img}">
        <h3>${videoJuego.nombre}</h3>
        <p>${videoJuego.precio}$</p>
        <span class= "restar"> - </span>
        <p>Cantidad: ${videoJuego.cantidad}</p>
        <span class= "sumar"> + </span>
        <p>Total: ${videoJuego.cantidad * videoJuego.precio}</p>
        `
        modalContainer.appendChild (carritoContent)

        let restar = carritoContent.querySelector(".restar")
        restar.addEventListener ("click", () =>{
            if(videoJuego.cantidad !== 1) {
            videoJuego.cantidad --;
            }
            localStorageGuardar();
            pintarCarrito();
        });

        let sumar = carritoContent.querySelector(".sumar");
        sumar.addEventListener ("click", () =>{
            videoJuego.cantidad++;
            localStorageGuardar();
            pintarCarrito();
        });


        let botonBorrar = document.createElement ("span");
        botonBorrar.innerHTML ="❌";
        botonBorrar.className = "delete-product";
        carritoContent.appendChild(botonBorrar);

        botonBorrar.addEventListener ("click", eliminarJuego)

        

    }) 


    const total = carrito.reduce((acc, producto) => acc + producto.precio * producto.cantidad, 0);
    const compraTotal = document.createElement("div");
    compraTotal.className = "total-content";
    compraTotal.innerHTML = `Total a pagar: ${total}$`;
    modalContainer.appendChild (compraTotal);


    const finalizarCompra = document.createElement ("button");
    finalizarCompra.className = "finalizar-compra";
    finalizarCompra.innerText = ("Finalizar Compra");
    modalContainer.appendChild(finalizarCompra);

    finalizarCompra.addEventListener ("click", () => {
        Toastify({
            text: "Felicidades por su compra",
            duration: 3000,
            destination: "https://github.com/apvarun/toastify-js",
            newWindow: true,
            close: false,
            gravity: "top", // `top` or `bottom`
            position: "center", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
              background: "linear-gradient(180deg, #000000, #0e0419, #14082b, #150b3d, #140b51, #0f0b65, #01097a)",
              borderRadius: "2rem",
              fontSize: "0,75rem"
            },
            onClick: function(){} // Callback after click
          }).showToast();
    });


};

verCarrito.addEventListener ("click", pintarCarrito);

const eliminarJuego = () => {
    const encontrarId = carrito.find ((element) => element.id);

    carrito = carrito.filter ((carritoId) =>{
        return carritoId !== encontrarId;
    });
    carritoContador();
    localStorageGuardar();
    pintarCarrito();
};


const carritoContador = () => {
    cantidadCarrito.style.display = "block"; 

    const carritoLength = carrito.length;

    localStorage.setItem ("carritoLength", JSON.stringify(carritoLength));

    cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"));

};

carritoContador();