
const bookCards = document.querySelector('#book-cards');



// funcion para mostrar en pantalla los libro presentes en el arreglo books 
export function printBooks (books) {
    bookCards.innerHTML = '';
    Object.values(books).forEach(itemBook =>{

        const div = document.createElement('div');
        div.className = 'col-md-10 mb-3';
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
      
    });
    localStorage.setItem('books', JSON.stringify(books)) ; // guarda en el Local Storage el arreglo books como string 
    console.log(books)

};

export function renderMessage(message, colorMessage, secondsToRemove) {
    const div = document.createElement('div');
    div.className = `alert alert-${colorMessage} message`;

    div.appendChild(document.createTextNode(message));

    const container = document.querySelector('.col-md-4');
    const bookForm = document.querySelector('#book-form');

    container.insertBefore(div, bookForm);
    setTimeout(() =>{
            document.querySelector('.message').remove();
    }, secondsToRemove);


};
