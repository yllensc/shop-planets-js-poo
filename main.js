let images = document.querySelectorAll('.curved-image');
let shopContainer = document.querySelector('.shop-container');

images.forEach(function(image) {
  image.addEventListener('click', function(event) {
    let shop = document.createElement('div');
    shop.classList.add('shop');
    shopContainer.appendChild(shop);

    let x = event.clientX;
    let y = event.clientY;
    shop.style.left = x + 'px';
    shop.style.top = y + 'px';

    setTimeout(function() {
      shop.remove();
    }, 800);
  });
});


class Articulo {
  constructor(nombre, precio, descripcion) {
    this.nombre = nombre;
    this.precio = parseFloat(precio);
    this.descripcion = descripcion;
    this.cantidad = 1;
  }
}

class Carrito {
  constructor() {
    this.cartItems = [];
    this.loadCartItems();
  }
  guardarCarrito() {
    // Convertir los datos del carrito a formato JSON
    const cartItemsJSON = JSON.stringify(this.cartItems);
    // Guardar los datos en el Local Storage con la clave 'carrito'
    localStorage.setItem('carrito', cartItemsJSON);
  }

  loadCartItems() {
    // Obtener los datos del Local Storage con la clave 'carrito'
    const cartItemsJSON = localStorage.getItem('carrito');
    // Si hay datos guardados, convertirlos a objetos y asignarlos a this.cartItems
    if (cartItemsJSON) {
      this.cartItems = JSON.parse(cartItemsJSON);
    }
  }

  agregarAlCarrito(nombre, precio) {
    let itemExistente = this.cartItems.find(item => item.nombre === nombre);
    if (itemExistente) {
      itemExistente.cantidad++;
    } else {
      let item = new Articulo(nombre, precio, '');
      this.cartItems.push(item);
    }
    this.guardarCarrito();
      itemAdded.style.display = "block";
  }

  eliminarArticulo(nombre) {
    let index = this.cartItems.findIndex(item => item.nombre === nombre);
    if (index !== -1) {
      let item = this.cartItems[index];
      item.cantidad--; 
      if (item.cantidad === 0) {
        this.cartItems.splice(index, 1); 
      }
      this.guardarCarrito();
      this.mostrarCarrito(); 
    }
    
  }
  

  vaciarCarrito() {
    this.cartItems = [];
    itemAdded.style.display = "none";
    this.mostrarCarrito();
    this.guardarCarrito();
  }

  mostrarCarrito() {
    let spanModal = document.getElementById('spanTotal');
    spanModal.innerHTML = '';
    let cartContainer = document.getElementById('tableBody');
    cartContainer.innerHTML = '';
    
    let totalCarrito = 0; // Variable para almacenar el total del carrito
    
    for (let i = 0; i < this.cartItems.length; i++) {
      let cartItem = this.cartItems[i];
      let subtotal = cartItem.precio * cartItem.cantidad; // Calcular subtotal del artículo
      totalCarrito += subtotal; // Sumar el subtotal al total del carrito
  
      let subtotalItem = cartItem.precio.toFixed(2);
      let totalItem = subtotal.toFixed(2);
  
      let rowHTML = `
    <tr>
      <th scope="row">${cartItem.nombre}</th>
      <td>${cartItem.cantidad}</td>
      <td>${subtotalItem}</td>
      <td>${totalItem}</td>
      <td><button class="btnEliminar" data-row-id="${i}">Eliminar</button></td>
    </tr>
  `;
  
      cartContainer.insertAdjacentHTML('afterbegin', rowHTML);
    }
  
    spanModal.textContent = 'Total del carrito: $ ' + totalCarrito.toFixed(2);
  
    let bodyModal = document.getElementById('bodyModal');
  
    let itemVaciar = document.getElementById('btnVaciar');
    if (!itemVaciar) {
      itemVaciar = document.createElement('button');
      itemVaciar.id = 'btnVaciar';
      itemVaciar.classList.add('btnVaciar');
      itemVaciar.textContent = 'Vaciar carrito';
      itemVaciar.addEventListener('click', () => { this.vaciarCarrito() });
      bodyModal.appendChild(itemVaciar);
    }
  
    let btnEliminar = document.getElementsByClassName('btnEliminar');
for (let i = 0; i < btnEliminar.length; i++) {
  btnEliminar[i].addEventListener('click', () => {
    let rowId = btnEliminar[i].dataset.rowId;
    let row = btnEliminar[i].closest('tr');
    row.remove();
    this.eliminarArticulo(this.cartItems[rowId].nombre);
  });
    }
  }
  
  
    
}


var carrito = new Carrito();
var itemAdded = document.getElementById('icon');
carrito.loadCartItems();
if (carrito.cartItems.length>0){
  debugger
  itemAdded.style.display = "block";
}
var imagenes = document.querySelectorAll('.curved-image');
for (let i = 0; i < imagenes.length; i++) {
  imagenes[i].addEventListener('click', function() {
    var nombre = this.parentNode.querySelector('p:first-child').textContent;
    var precio = parseFloat(this.parentNode.querySelector('p:nth-child(2)').textContent.slice(1));
    carrito.agregarAlCarrito(nombre, precio);
  });
}

document.getElementById('carShop').addEventListener('click', function() {
  carrito.mostrarCarrito();
  var modalShopElement = new bootstrap.Modal(document.getElementById('modalShop'));
  modalShopElement.show();
});


