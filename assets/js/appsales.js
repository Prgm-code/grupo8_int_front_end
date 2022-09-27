/* ==================================================
Página para procesar pedidos y carrito de compras
Developer: Miguel Angel Castañeda 9/24/2022  
===================================================== */

console.log('Empezamos!!!')

// definicion variables
const bookCards = document.querySelector('#book-cards');
const CartSection = document.querySelector('#CartSection');
let books = {};

let Cart = {};

// FUNCION 1: INICIO al finalizar carga del Dom
document.addEventListener('DOMContentLoaded', () => {

    // consulta LocalStorage si existe "books" en Local Storage ... de existir lo extrae y lista elementos en la funcion printBooks()
    if (localStorage.getItem('books')) {
        console.log('hay books')
        books = JSON.parse(localStorage.getItem('books')); // obtiene los datos como string por lo que se utiliza parse 
        printBooks(books);
    }
    if (localStorage.getItem('Cart')) {
        console.log('hay books en Cart')
        Cart = JSON.parse(localStorage.getItem('Cart')); // obtiene los datos como string por lo que se utiliza parse 
        printCart(Cart);
    }

    
});
// FUNCION 1: TERMINA

// FUNCION 2 : Mostrar en pantalla los libros presentes en el arreglo books (Local Storage)
const printBooks = function (books) {
    bookCards.innerHTML = '';
    Object.values(books).forEach(itemBook => {

        const div = document.createElement('div');
        div.className = '';
        div.innerHTML = `
                <div class="p-3 mb-2 bg-secondary text-white">
                <table> 
                <tr>
                <td class='col-xl-1.5 col-md-2 col-4 text-left p-1'>
                <img src=${itemBook.photoUrl} class='small-img'></td>
                <td class='col-xl-4 col-md-8 col-12 text-left p-1'>
                <h7 class="card-title text-light">Book Title:</h7>
                <p class="card-text text-light">${itemBook.title}</p></td>
                <td class='col-xl-1.5 col-md-2 col-4 text-left p-1'>
                <div>Author: ${itemBook.author}</div></td>
                <td class='col-xl-1.4 col-md-2 col-4 text-left p-1'>
                <div>ISBN: ${itemBook.isbn}</div>
                <div>Rating: ${itemBook.rating}</div></td>
                <td class='col-xl-1.5 col-md-2 col-4 text-left p-1'>
                <div>Price:$ ${itemBook.price}</div>
                <div class="card-body">
                <button class="btn btn-light shop" id="${itemBook.title}">Shop Book</button>
                </td>
                </div> 
                </tr>
                </table>
                </div> 
         `
        bookCards.appendChild(div)

        //  Identificar articulos al carro de compras 
        div.addEventListener('click', e => {
            addCart(e)

        })

    });
    localStorage.setItem('books', JSON.stringify(books)); // guarda en el Local Storage el arreglo books como string 
    console.log(books)
}
// FUNCION 2 : TERMINA

// FUNCION 3 : Añadir articulos al carro de compras (Array)
const addCart = e => {
    if (e.target.classList.contains('btn-light')) {
        let book = books[e.target.id]
        book.quantity = 1;

        console.log(book)

        if (Cart.hasOwnProperty(book.title)) {
            book.quantity = Cart[book.title].quantity + 1
        }

        Cart[book.title] = { ...book };
        printCart(Cart)



    }
    e.stopPropagation()
}

// Lee datos del carro de compras
const printCart = function (Cart) {
    localStorage.setItem('Cart', JSON.stringify(Cart));
    printFooter();
    CartSection.innerHTML = '';
    Object.values(Cart).forEach(itemBook => {

        const div = document.createElement('div');
        div.className = '';
        div.innerHTML = `
                    <div class="p-2 mb-1   ">
                    <tr>
                        <td class='col-xl-1.4 col-md-2 col-4 text-left p-1'>
                         ${itemBook.isbn}</td>
                         <td class="card-text text-light">${itemBook.title}</td>
                         <td> ${itemBook.quantity}</td>
                    
                       <button type="button" class="btn btn-danger btn-sm" id="${itemBook.title}">x</i></button>
                         <td class='col-xl-1.5 col-md-2 col-4 text-left p-1'>
                         $ ${Number(itemBook.price) * itemBook.quantity}</td>
                    </tr>
                    </div>
             `
        CartSection.appendChild(div)

        //  Identificar articulos al remover del carro de compras 
        div.addEventListener('click', e => {
            removeCart(e)

        })

    })
        ;
}



// FUNCION 3 : Termina

// FUNCION 4 : Remover articulo del carrito
const removeCart = e => {
    if (e.target.classList.contains('btn-danger')) {

        delete Cart[e.target.id]




        // guarda en LocStorage el libro Sele
        printCart(Cart)
        printFooter()
    }
    e.stopPropagation()
}
// FUNCION 4 : Termina

// FUNCION 5: Footer, si no hay articulos en el carrito, vamos a comprar
//

const footer = document.querySelector('#footer');
const printFooter = () => {
    footer.innerHTML = ''
    if (Object.keys(Cart).length === 0) {
        footer.innerHTML = `
     <th scope="row" colspan="5">Cart is empty - Let's start shopping!</th>
      `
    }
}
