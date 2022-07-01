let articles = [];

class Product {
  constructor(id, name, price, category, img) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.category = category;
    this.img = img;
  }
}

articles.push(new Product("01", "Polerin Yaro Negro", 4790, "Ropa", "./assets/images/card/card1.jpg"));
articles.push(new Product("02", "Poleron Dean Crudo", 8990, "Ropa", "./assets/images/card/card2.jpg"));
articles.push(new Product("03", "Jean Jacob", 8990, "Ropa", "./assets/images/card/card3.jpg"));
articles.push(new Product("04", "Poleron Dean Negro", 8990, "Ropa", "./assets/images/card/card4.jpg"));
articles.push(new Product("05", "Kit Male Grooming", 5890, "MakeUp", "./assets/images/card/makeup1.jpg"));
articles.push(new Product("06", "Mascara en gel", 1520, "MakeUp", "./assets/images/card/makeup2.jpg"));
articles.push(new Product("07", "Primer Filler", 1290, "MakeUp", "./assets/images/card/makeup3.jpg"));
articles.push(new Product("08", "Corrector Liquido", 1290, "MakeUp", "./assets/images/card/makeup4.jpg"));

// console.log(articles)
let shoppingCart;

if (JSON.parse(localStorage.getItem("shoppingCart"))){
    shoppingCart = JSON.parse(localStorage.getItem(shoppingCart))
} else {
    localStorage.setItem("shoppingCart", JSON.stringify([]))
    shoppingCart = JSON.parse(localStorage.getItem("shoppingCart"))
}

function desplegarProducts() {
    for (let i = 0; i < articles.length; i++) {
        const element = articles[i];
        const { id, name, price, img } = element        
        const card = `
        <div class="card">
            <div>
                <img class="imgProduct" src=${img} alt=''/>
            </div>
            <p>${name}</p>
            <div>
                <p>$${price.toLocaleString()}</p>
            </div>
            <div>
                <button id=${id} class="btnAgregar">Agregar al carrito</button>
            </div>
        </div>
        `
        const container = document.getElementById('container')
        container.innerHTML += card
    }
}

desplegarProducts()

const btnAgregar = document.getElementsByClassName('btnAgregar')

for (let i = 0; i < btnAgregar.length; i++) {
    const element = btnAgregar[i];
    element.addEventListener('click', agregarAlCarrito)       
}

function agregarAlCarrito (e) {
    const btn = e.target;
    const id = btn.getAttribute('id') 
    const prodEncontrado = articles.find(art => art.id == id)
    const enCarrito = shoppingCart.find(art => art.id == prodEncontrado.id) 
    if (!enCarrito){
        shoppingCart.push({...prodEncontrado, cantidad: 1})
    } else {
        let carritoFiltrado = shoppingCart.filter(art => art.id != enCarrito.id)
        shoppingCart = [...carritoFiltrado, {...enCarrito, cantidad: enCarrito.cantidad +1}]
    }
    console.log(shoppingCart)
    localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart))
}
const totalCarrito = () => {
    return shoppingCart.reduce((acc, art) => acc + art.price * art.cantidad, 0)
}

const body = document.getElementById('shoppingCart')
if(shoppingCart.length == 0){
    const texto = `
    <div class="cartContainer">
        <h3 class='txtCarrito'>El carrito esta vacio</h1>
        <a href='index.html'>
            <button class='btnVolver'>VOLVER</button>
        </a>
    </div>`;
body.innerHTML += texto;
} else {
    const titulo = `
    <div class='cartContainer'>
        <h1 class= 'txtCarrito'>Carrito de compras</h1>
    </div>`
    body.innerHTML += titulo;
    const table = `
    <div class="tableContainer">
        <table>
            <thead>
                <tr>
                    <th></th>
                    <th class="txtTabla">Products</th>
                    <th class="txtTabla">Cantidad</th>
                    <th class="txtTabla">Precio</th>
                </tr>
            </thead>
            <tbody id='tbody'></tbody>
            <tfoot>
                <tr>
                    <th></th>
                    <th></th>
                    <th class="txtTotal">Total:</th>
                    <th id='total'>$${totalCarrito().toLocaleString()}</th>
                </tr>
            </tfoot>
        </table>
    </div>
    <div>
        <button class="btnVolver">Terminar compra</button>
    </div>`
    body.innerHTML += table
    const tbody =document.getElementById('tbody')
    for (let i = 0; i < shoppingCart.length; i++) {
        const element = shoppingCart[i];
        const { id, name, img, price, cantidad} = element;
        const cart = `
        <tr id=${id}>
            <th><img class='trash' src='assets/images/trash.png' alt='trash'></th>
            <th class='detallesTabla'><img class= 'imgProdCart' src=${img} alt=''><span class='nameProd>${name}</span></th>
            <th>${cantidad}</th>
            <th>$${(cantidad * price).toLocaleString()}</th>
        </tr>`
    tbody.innerHTML += cart
    }

}