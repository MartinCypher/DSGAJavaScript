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
    modalContainer.appendChild (compraTotal)
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

    const carritoLenght = carrito.length;
    localStorage.setItem ("carritoLenght", JSON.stringify(carritoLenght));

    cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoLenght"));

};

carritoContador();