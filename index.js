document.addEventListener("DOMContentLoaded", function() {
    getBooks();
    addBookClickListener();
}) //DOMContentLoaded
                                                    
function getBooks() {
    fetch('http://localhost:3000/books')
    .then(response => response.json())
    .then(showBooks)
} //function getBooks

function showBooks(books) {
    const list = document.getElementById('list');
    list.innerHTML = ""
    
    books.forEach((book) => {
        list.innerHTML += `<li class="book" id="${book.id}">${book.title}</li>`
    })
} //function showBooks

function addBookClickListener() {
    const list = document.getElementById('list');
    list.addEventListener('click', (event) => {
        // event.preventDefault();
        
        if (event.target.className === 'book') {
            const bookId = event.target.id;
            getBook(bookId);
        }
    })
} //function showBookListener

function getBook(id) {
    fetch(`http://localhost:3000/books/${id}`)
    .then(response => response.json())
    .then(showBook)
} //function getBook

function showBook(book) {
    const showPanel = document.getElementById('show-panel');

    showPanel.innerHTML = `
        <h2>${book.title}</h2>
        <img src="${book.img_url}"><br>
        <button id="like-btn">${liked(book) ? "Unlike" : "Like"}</button>
        <p>${book.description}</p>
        <h4>Likers</h4>
        <ul class="likers"></ul>`;
    
    ul = showPanel.lastChild;
    book.users.forEach(user => {
        ul.innerHTML += `<li>${user.username}</li>`;
    })

    addLikeClickListener(book);
} //function showBook

function liked(book) {
    user1_id = 1;
    let liked = false;
    book.users.forEach((user) => {
        if (user.id === user1_id)
            liked = true;
    })
    return liked
} //function liked

function addLikeClickListener(book) {
    const likeButton = document.querySelector('#like-btn')
    likeButton.addEventListener('click', (event) => {
        addOrRemoveUser(book)
    })
} //function addLikeClickListener

function addOrRemoveUser(book) {
    if (event.target.innerText === "Like")
        book.users.push({"id":1, "username":"pouros"});
    else
        book.users.pop();

    showBook(book)
    updateUsers(book);
} //function addOrRemoveUser

function updateUsers(book) {
    fetch(`http://localhost:3000/books/${book.id}`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify({
            users: book.users
        })
    })
} //function updateUsers