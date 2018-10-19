let currentUser = {
  id: 1,
  username: "pouros"
};
let flag = false;

document.addEventListener("DOMContentLoaded", function() {
  fetchBooks();
  fetchUsers();
  fetchABook(1);
  //global event listener for list
  let list = document.getElementById("list");
  list.addEventListener("click", event => {
    event.preventDefault();
    let bookId = event.target.dataset.bookId;
    fetchABook(bookId);
  });
});

//Get a list of books & render them
function fetchBooks() {
  fetch("http://localhost:3000/books")
    .then(resp => resp.json())
    .then(books => {
      document.getElementById("list").innerHTML = "";
      books.forEach(book => {
        renderBookList(book);
      });
    });
}

function renderBookList(book) {
  list.innerHTML += `
  <li data-book-id="${book.id}" >${book.title}</li>
  `;
}

//fetch a book and display it
function fetchABook(bookId) {
  fetch(`http://localhost:3000/books/${bookId}`)
    .then(resp => resp.json())
    .then(book => {
      displayBook(book);
    });
}
function displayBook(book) {
  // console.log(book);
  let show = document.getElementById("show-panel");
  show.innerHTML = `
  <h1>${book.title}</h1>
  <img src="${book.img_url}"
  <p>${book.description}</p>
  <strong>Users: </strong>
  `;
  displayUserLikes(book);
}

function displayUserLikes(book) {
  let show = document.getElementById("show-panel");
  book.users.forEach(user => {
    show.innerHTML += `<strong>[${user.username}] </strong>`;
  });
  show.innerHTML += `
  <br>
  <button data-book-id="${book.id}" data-users='${JSON.stringify(
    book.users
  )}' onclick="toggleLikeBook(event)">Like &hearts;</button>
  `;
}

function toggleLikeBook(event) {
  // event.prevenDefault();
  let bookId = event.target.dataset.bookId;
  let bookUsers = JSON.parse(event.target.dataset.users);
  let newBookUsers = [...bookUsers];

  // debugger;
  flag = !flag;

  if (flag) {
    // debugger;
    newBookUsers.push(currentUser);
    patchBookUsers(bookId, newBookUsers);
  } else {
    newBookUsers.pop();
    patchBookUsers(bookId, newBookUsers);
  }
}

function patchBookUsers(bookId, users) {
  fetch(`http://localhost:3000/books/${bookId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    },
    body: JSON.stringify({
      users: users
    })
  }).then(() => fetchABook(bookId));
}

function fetchUsers() {
  fetch("http://localhost:3000/users")
    .then(resp => resp.json())
    .then(data => {
      createUserList(data);
    });
}

function createUserList(users) {
  users.forEach(user => {
    document.getElementById("user");
  });
}
