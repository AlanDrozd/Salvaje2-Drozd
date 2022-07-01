
if(JSON.parse(localStorage.getItem('carrito'))) {
    carrito = JSON.parse(localStorage.getItem('carrito'))
} else {
    localStorage.setItem('carrito', JSON.stringify([]))
    carrito = JSON.parse(localStorage.getItem('carrito'))
}

const totalCarrito = () => {
    return carrito.reduce((acc, art) => acc + art.precio * art.cantidad, 0)
}

const body = document.getElementById('carrito')
if(carrito.length == 0){
    const texto = `
    <div class="cartContainer">
        <h1 class='txtCarrito'>El carrito esta vacio</h1>
        <a class='btnVolver' href='index.html'>
            <button>VOLVER</button>
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
    <div class="btn-container">
        <button class="btnTerminar">Terminar compra</button>
    </div>`
    body.innerHTML += table
    const tbody =document.getElementById('tbody')
    for (let i = 0; i < carrito.length; i++) {
        const element = carrito[i];
        const { id, name, img, price, cantidad} = element;
        const cart = `
        <tr id=${id}>
            <th><img class='trash' src='../images/trash.png' alt='trash'></th>
            <th class='detallesTabla'><img class= 'imgProdCart' src=${img} alt=''><span class='nameProd>${name}</span></th>
            <th>${cantidad}</th>
            <th>$${(cantidad * price).toLocaleString()}</th>
        </tr>`
    tbody.innerHTML += cart
    }

}