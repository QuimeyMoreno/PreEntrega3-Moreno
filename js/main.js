// Objetos
class Producto {
  constructor(nombre, precio, ) {
    this.nombre = nombre;
    this.precio = precio;
    
  }
}

// Inicio
const listaProductos = [
  new Producto("Pancho - La Perla", 500),
  new Producto("Hamburguesa - La Perla", 500),
  new Producto("Salvado Chico - La Perla", 700),
  new Producto("Chico - La Perla", 650),
  new Producto("Grande - La Perla", 1000),
  new Producto("Hamburguesa Queso - Pazzi", 1200),
  new Producto("Queso - Boggies", 800),
  new Producto("Sesamo - Boggies", 700),
  new Producto("Lacteado - Mr. Miga", 650),
  new Producto("Salvado - Mr. Miga", 520),
  new Producto("Semilla - Mr. Miga", 500),
  new Producto("Pascualina - Signo", 400),
  new Producto("Tapa x18 - Signo", 870),
  new Producto("Tapa x500 - Signo", 620),
];

const listaProductos2 = [
  new Producto("Pancho - La Perla", 122100),
  new Producto("Hamburguesa - La Perla", 122100),
  new Producto("Salvado Chico - La Perla", 122100),
  new Producto("Chico - La Perla", 122100),
  new Producto("Grande - La Perla", 122100),
  new Producto("Lacteado - Mr. Miga", 122100),
  new Producto("Salvado - Mr. Miga", 122100),
  new Producto("Semilla - Mr. Miga", 122100),
  new Producto("Pascualina - Signo", 122100),
  new Producto("Tapa x18 - Signo", 122100),
  new Producto("Tapa x500 - Signo", 122100),
];


const listaProductos3 = [
  new Producto("Pancho - La Perla", 888888),
  new Producto("Hamburguesa - La Perla", 888888),
  new Producto("Salvado Chico - La Perla", 888888),
  new Producto("Chico - La Perla", 888888),
  new Producto("Grande - La Perla", 888888),
  new Producto("Hamburguesa Queso - Pazzi", 888888),
  new Producto("Queso - Boggies", 888888),
  new Producto("Sesamo - Boggies", 888888),
  new Producto("Lacteado - Mr. Miga", 888888),
 

];

let boleta = [];

/****************************************** */


function renderizarProductos(productos) {
  const contenedor = document.getElementById("contenedor");
  contenedor.innerHTML = "";

  for (const producto of productos) {
    const divPadre = document.createElement("div");
    divPadre.className = "col-sm-12 col-lg-3 mb-2";

    const divCard = document.createElement("div");
    divCard.className = "card";

    const divCardBody = document.createElement("div");
    divCardBody.className = "card-body";

    const h5 = document.createElement("h5");
    h5.className = "card-title";
    h5.innerHTML = producto.nombre;

    const p = document.createElement("p");
    p.className = "card-text";
    p.innerHTML = `<strong>Precio:</strong> $${producto.precio}`;

    const divAgregarALaBoleta = document.createElement("div");
    divAgregarALaBoleta.className = "d-flex align-items-center";

    const button = document.createElement("button");
    button.className = "btn btn-primary flex-shrink-0 me-3";
    button.innerText = "Agregar a la boleta";

    const inputCantidad = document.createElement("input");
    inputCantidad.type = "number";
    inputCantidad.placeholder = "Ingrese la cantidad";
    inputCantidad.className = "form-control";
    inputCantidad.value = "";

    
    button.addEventListener("click", () => {
      const cantidad = inputCantidad.value;
      guardarProductoEnLS(producto, cantidad);
    });

   
    divAgregarALaBoleta.append(button, inputCantidad);
    divCardBody.append(h5, p, divAgregarALaBoleta);
    divCard.append(divCardBody);
    divPadre.append(divCard);
    contenedor.append(divPadre);
  }
}


/****************************************** */


function renderizarBoleta(productosBoleta) {
  const tbody = document.querySelector("#boleta table tbody");
  tbody.innerHTML = "";

  for (const productoBoleta of productosBoleta) {
    const tr = document.createElement("tr");

    const tdNombre = document.createElement("td");
    tdNombre.innerText = productoBoleta.nombre;

    const tdPrecio = document.createElement("td");
    tdPrecio.innerText = `$${productoBoleta.precio}`;

    const tdCantidad = document.createElement("td");
    tdCantidad.innerText = productoBoleta.cantidad;

    const tdTotal = document.createElement("td");
    const totalProducto = productoBoleta.precio * productoBoleta.cantidad;
    tdTotal.innerText = totalProducto;

    const tdEliminar = document.createElement("td");

    const botonEliminar = document.createElement("button");
    botonEliminar.className = "btn btn-danger";
    botonEliminar.innerText = "Eliminar";

   
    botonEliminar.addEventListener("click", () => {
      eliminarProducto(productoBoleta);
    });

    tdEliminar.append(botonEliminar);
    tr.append(tdNombre, tdPrecio, tdCantidad, tdTotal, tdEliminar);
    tbody.append(tr);
  }


  renderizarTotalBoleta(productosBoleta);
}


/****************************************** */


function renderizarTotalBoleta(productosBoleta) {
  const totalBoleta = calcularTotalBoleta(productosBoleta);

  const contenedorTotalBoleta = document.querySelector(".total-boleta");
  contenedorTotalBoleta.innerHTML = "";

  const p = document.createElement("p");
  p.className = "fs-5"
  p.innerHTML = `<strong>El total de la boleta es de: $${totalBoleta}</strong>`;

  contenedorTotalBoleta.append(p);
}



/****************************************** */


function calcularTotalBoleta(productosBoleta) {
  let totalBoleta = 0;

  for (const productoBoleta of productosBoleta) {
    totalBoleta += productoBoleta.precio * productoBoleta.cantidad;
  }

  return totalBoleta;
}


/******************************************* */


function guardarProductoEnLS(producto, cantidad) {
  const productoAAgregar = {
    nombre: producto.nombre,
    precio: producto.precio,
    cantidad: parseInt(cantidad),
  };

  if (!boleta) {
    boleta = [productoAAgregar];
  } else {
    const indiceExisteProducto = boleta.findIndex((el) => {
      return el.nombre === productoAAgregar.nombre;
    });

    if (indiceExisteProducto === -1) {
      boleta.push(productoAAgregar);
    } else {
      boleta[indiceExisteProducto].cantidad += parseInt(cantidad);
    }
  }

 
  localStorage.setItem("boleta", JSON.stringify(boleta));

  renderizarBoleta(boleta);
}



/********************************************* */


function obtenerProductosEnLS() {
  boleta = JSON.parse(localStorage.getItem("boleta"));

  if (boleta) {
    renderizarBoleta(boleta);
  }
}



/********************************************** */


function eliminarProducto(producto) {
  
  const indiceProductoAEliminar = boleta.findIndex((el) => {
    return producto.nombre === el.nombre;
  });

  
  if (indiceProductoAEliminar !== -1) {
  
    boleta.splice(indiceProductoAEliminar, 1);

   
    localStorage.setItem("boleta", JSON.stringify(boleta));

    renderizarBoleta(boleta);
  }
}



/************************************************* */


function inicializarSelect() {
  const select = document.getElementById("selectLista");

  select.addEventListener("change", () => {
    const value = select.value;

    switch (value) {
      case 'lista1':
        renderizarProductos(listaProductos);
        break;

      case 'lista2':
        renderizarProductos(listaProductos2);
        break;

        case 'lista3':
          renderizarProductos(listaProductos3);
          break;

      default:
        
        break;
    }
  });
}




renderizarProductos(listaProductos);
obtenerProductosEnLS();
inicializarSelect();
