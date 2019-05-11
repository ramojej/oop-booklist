//Book COnstructor
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

//UI Constructor 
function UI() {

}

UI.prototype.addBookToList = function(book) {
    const list = document.getElementById('book-list');

    //create tr element
    const row = document.createElement('tr');

    //insert cols
    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X</a></td>
    `;

    list.appendChild(row);
}

//delete book
UI.prototype.deleteBook = function(target) {
    if(target.className === 'delete') {
        target.parentElement.parentElement.remove();
    }
}

//show alert
UI.prototype.showAlert = function(message, className) {
    //create div
    const div = document.createElement('div');
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(message));
    //get parent
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');

    container.insertBefore(div, form);

    //Timeout after 3 secs
    setTimeout(function() {
        document.querySelector('.alert').remove();
    }, 3000);
}

UI.prototype.clearFields = function() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}

//event listener for add book
document.getElementById('book-form').addEventListener('submit', function(e) {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;

    //instantiate book
    const book = new Book(title, author, isbn);

    //instantitate ui
    const ui = new UI();

    //validate
    if( title === '' || author === '' || isbn === '' ) {
        //error alert
        ui.showAlert('Please fill in all fields', 'error');

    } else {
        //add book to list
        ui.addBookToList(book);

        //show alert
        ui.showAlert('Book added!', 'success');

        //clear fields
        ui.clearFields();
    }



    
    e.preventDefault();
});

//Event Listener for Delete
document.getElementById('book-list').addEventListener('click', function(e) {
    const ui = new UI();
    ui.deleteBook(e.target);

    //show message
    ui.showAlert('Book removed!', 'success');
    e.preventDefault();
});