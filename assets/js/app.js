
// definicion variables
import { renderMessage , printBooks } from "../js/UI.js";



let books = {};

// inicia al finalizar carga del Dom
document.addEventListener('DOMContentLoaded', () => {


    // consulta LocalStorage si existe "books" en Local Storage ... de existir lo extrae y lista elementos en la funcion printBooks()
    if (localStorage.getItem('books') !=={} ){
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
            books[book.title] = {...book}; //inserta libro book en el arreglo books 
            renderMessage('New Book Added', 'success', '3000');

            printBooks(books); // llama a funcion para mostrar los books

            // Vacia formulario
            titleInput.value ="";
            authorInput.value ="";
            isbnInput.value ="";
            ratingInput.value = "";
            priceInput.value = "";
            photoUrlInput.value ="";

        }else{
            renderMessage('Must Complete all fields', 'danger', '5000');
        }

    });
    // borra libro book del arreglo books 
    document.getElementById('book-cards')
    .addEventListener('click', (e) => {
        if (e.target.classList.contains("delete")) {
            
            delete books[e.target.getAttribute('_id')]; // elimina el libro del arreglo books
            renderMessage('Book Removed', 'danger', '2000')
            
            printBooks(books);
            console.log(JSON.stringify(books))
        };

    
        e.preventDefault();
    });




});

