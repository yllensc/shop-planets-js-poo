var images = document.querySelectorAll('.curved-image');
var shopContainer = document.querySelector('.shop-container');

images.forEach(function(image) {
  image.addEventListener('click', function(event) {
    var shop = document.createElement('div');
    shop.classList.add('shop');
    shopContainer.appendChild(shop);

    var x = event.clientX;
    var y = event.clientY;
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
    var itemExistente = this.cartItems.find(item => item.nombre === nombre);
    if (itemExistente) {
      itemExistente.cantidad++;
    } else {
      var item = new Articulo(nombre, precio, '');
      this.cartItems.push(item);
    }
    this.guardarCarrito();
      itemAdded.style.display = "block";
  }

  eliminarArticulo(nombre) {
    var index = this.cartItems.findIndex(item => item.nombre === nombre);
    if (index !== -1) {
      var item = this.cartItems[index];
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
    var itemAdded = document.getElementById('icon');
    itemAdded.style.display = "none";
    this.mostrarCarrito();
    this.guardarCarrito();
  }

  mostrarCarrito() {
      var cartContainer = document.getElementById('listaShop');
      cartContainer.innerHTML = '';
    
      var totalCarrito = 0; // Variable para almacenar el total del carrito
    
      for (var i = 0; i < this.cartItems.length; i++) {
        var cartItem = this.cartItems[i];
    
        var itemNombre = document.createElement('span');
        itemNombre.textContent = cartItem.nombre;
    
        var itemPrecio = document.createElement('span');
        itemPrecio.textContent = '$' + cartItem.precio.toFixed(2);
    
        var itemCantidad = document.createElement('span');
        itemCantidad.textContent = 'Cantidad: ' + cartItem.cantidad;
    
        var itemTotal = document.createElement('span');
        var subtotal = cartItem.precio * cartItem.cantidad; // Calcular subtotal del artículo
        itemTotal.textContent = 'Total: $' + subtotal.toFixed(2);
        totalCarrito += subtotal; // Sumar el subtotal al total del carrito
    
        var itemEliminar = document.createElement('button');
        itemEliminar.classList.add("btnEliminar");
        itemEliminar.textContent = 'Eliminar';
        itemEliminar.addEventListener('click', () => { this.eliminarArticulo(cartItem.nombre); });
    
        var cartItemDiv = document.createElement('li');
        cartItemDiv.appendChild(itemNombre);
        cartItemDiv.appendChild(itemPrecio);
        cartItemDiv.appendChild(itemCantidad);
        cartItemDiv.appendChild(itemTotal);
        cartItemDiv.appendChild(itemEliminar);
    
        cartContainer.appendChild(cartItemDiv);
      }
    
      var itemTotalCarrito = document.createElement('span');
      itemTotalCarrito.textContent = 'Total del carrito: $' + totalCarrito.toFixed(2);
      cartContainer.appendChild(itemTotalCarrito);
    
      var itemVaciar = document.createElement('button');
      itemVaciar.classList.add("btnVaciar");
      itemVaciar.textContent = 'Vaciar carrito';
      itemVaciar.addEventListener('click', () => { this.vaciarCarrito() });
      cartContainer.appendChild(itemVaciar);
    }
    
}

var carrito = new Carrito();
carrito.loadCartItems();
var itemAdded = document.getElementById('icon');
var imagenes = document.querySelectorAll('.curved-image');
for (var i = 0; i < imagenes.length; i++) {
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


