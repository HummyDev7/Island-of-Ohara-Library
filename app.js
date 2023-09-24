const addBookForm = document.querySelector(".add-book-modal");
const addBookBtn = document.querySelector("#addBookBtn");
const closeBkFrmBtn = document.querySelector(".close-btn");
const inputForm = document.querySelector("#addBookForm");

let bookLibrary = [];

addBookBtn.addEventListener("click", function() {
  addBookForm.classList.add("show-add-book-form");
});

closeBkFrmBtn.addEventListener("click", function() {
  addBookForm.classList.remove("show-add-book-form");
});

//Getting the book information
function book( title, author, pages, genre, bookCover, publishDate, bookStatus ) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.genre = genre;
  this.url = bookCover;
  this.publishDate = publishDate;
  this.bookStatus = bookStatus;
}

function gettingBookInfo() {
  const bookTitle = document.querySelector("#book-title").value;
  const bookAuthor = document.querySelector("#book-author").value;
  const bookPages = document.querySelector("#book-pages").value;
  const bookGenre = document.querySelector("#book-genre").value;
  const bookCoverUrl = document.querySelector('#book-url-img').value;
  const bookPublishDate = document.querySelector("#book-publish-date").value;
  const readStatus = document.querySelector("#read-status").value;

  let newBook = new book(bookTitle, 
                         bookAuthor, 
                         bookPages, 
                         bookGenre, 
                         bookCoverUrl,
                         bookPublishDate,
                         readStatus
                        )

  bookLibrary.push(newBook);
}

function createBookCard() { 

  let book;

  for ( let i = 0; i < bookLibrary.length; ++i ) {
    book = bookLibrary[i];
  }

  const bookContainer = document.querySelector("#book-container");

  const cardContainer = document.createElement("div");
  const bookTitle = document.createElement('p');
  const bookAuthor = document.createElement('p');
  const bookCover = document.createElement('img');
  const removeBtn = document.createElement('button');

  cardContainer.classList.add("cardContainerStyle");
  bookCover.classList.add("bookCover");
  removeBtn.classList.add("removeBtn");
  bookAuthor.classList.add("bookAuthorStyle");

  bookTitle.textContent = `${book.title}`;
  bookAuthor.textContent = `${book.author}`;

  cardContainer.appendChild(removeBtn);
  cardContainer.appendChild(bookCover);
  cardContainer.appendChild(bookTitle);
  cardContainer.appendChild(bookAuthor);

  bookContainer.appendChild(cardContainer);
}

function removeBook() {
  const rmvBtn = document.querySelectorAll(".removeBtn");
  const list = document.querySelectorAll(".cardContainerStyle");

  for ( let x = 0; x < rmvBtn.length; ++x ) {
    rmvBtn[x].addEventListener('click', () => {
      list[x].parentElement.removeChild(list[x]);
    })
  }
}

document.querySelector("#addBookForm").addEventListener('submit', function() {
  event.preventDefault();
  gettingBookInfo();
  addBookForm.classList.remove("show-add-book-form");
  inputForm.reset();
  createBookCard();
  removeBook();
})




