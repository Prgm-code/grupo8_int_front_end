
// definicion variables
const bookCards = document.querySelector('#book-cards');
let books = {};

// inicia al finalizar carga del Dom
document.addEventListener('DOMContentLoaded', () => {


    // consulta LocalStorage si existe "books" en Local Storage ... de existir lo extrae y lista elementos en la funcion printBooks()
    if (localStorage.getItem('books')){
        console.log('hay books')
        books = JSON.parse(localStorage.getItem('books')); // obtiene los datos como string por lo que se utiliza parse 
        printBooks(books);
    }

    //datos del formulario 
    const titleInput = document.querySelector('#title');
    const authorInput = document.querySelector('#author');
    const isbnInput = document.querySelector('#isbn');
    const ratingInput = document.querySelector('#rating');
    const priceInput = document.querySelector('#price');
    const photoUrlInput = document.querySelector('#photoUrl');
    const previewBotton = document.querySelector('#previewBotton');

    const allInputs = document.querySelectorAll('input');

    // Chequeo de class "is-invalid"
    allInputs.forEach(input => {
        input.addEventListener('change', function (event) {
            if (event.target.value !== "") {
                input.classList.remove('is-invalid');
            }
        })
    })


    // Funcion para visualizar el libro ingresado book en el arreglo books
    previewBotton.addEventListener('click', function (event) {
        event.preventDefault();
        
        const book ={
            title: titleInput.value,
            author: authorInput.value,
            isbn: isbnInput.value,
            rating: ratingInput.value,
            price: priceInput.value,
            photoUrl: photoUrlInput.value,
        };
        books[book.title] = {...book}; //inserta libro book en el arreglo books 
        

        if (book.title === "") titleInput.classList.add('is-invalid');
        if (book.author === "") authorInput.classList.add('is-invalid');
        if (book.isbn === "") isbnInput.classList.add('is-invalid');
        if (book.rating === "") ratingInput.classList.add('is-invalid');
        if (book.price === "") priceInput.classList.add('is-invalid');
        if (book.photoUrl === "") photoUrlInput.classList.add('is-invalid');

        if (book.title !== "" && book.author !== "" && book.isbn !== "" && book.rating !== "" && book.photoUrl !== "" && book.price !== "") {
            allInputs.forEach(input => {
                input.classList.remove('is-invalid');
            });

            printBooks(books); // llama a funcion para mostrar los books

            // Vacia formulario
            titleInput.value ="";
            authorInput.value ="";
            isbnInput.value ="";
            ratingInput.value = "";
            priceInput.value = "";
            photoUrlInput.value ="";

        }

    });
    // borra libro book del arreglo books 
    document.getElementById('book-cards')
    .addEventListener('click', (e) => {
        if (e.target.classList.contains("delete")) {
            
            delete books[e.target.getAttribute('_id')]; // elimina el libro del arreglo books
            printBooks(books);
        };

    
        e.preventDefault();
    });




});


// funcion para mostrar en pantalla los libro presentes en el arreglo books 
const printBooks = function (books) {
    bookCards.innerHTML = '';
    Object.values(books).forEach(itemBook =>{

        const div = document.createElement('div');
        div.className = 'col-md-8 mb-3';
        div.innerHTML = `
            <div class="card shadow ">
            <img src=${itemBook.photoUrl} class="card-img-top" alt="...">
                <div class="card-body ">
                    <h5 class="card-title">Book Title:</h5>
                    <p class="card-text"><strong>${itemBook.title}</strong></p>
                </div>
                <ul class="list-group list-group-flush">
                <li class="list-group-item"><div>Author:</div><div>${itemBook.author}</div></li>
                <li class="list-group-item"><div>ISBN:</div><div> ${itemBook.isbn}</div></li>
                <li class="list-group-item"><div>Rating:</div><div>${itemBook.rating}</div></li>
                <li class="list-group-item"><div>Price:</div><div>$ ${itemBook.price}</div></li>
                </ul>
             <div class="card-body">
                <a href="#" class="btn btn-danger delete" _id="${itemBook.title}">Delete Book</a>
            </div>
         `
      bookCards.appendChild(div)
      
      localStorage.setItem('books', JSON.stringify(books)) ; // guarda en el Local Storage el arreglo books como string 
    

    });
}
