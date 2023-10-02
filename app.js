const addBookForm = document.querySelector(".add-book-modal");
const addBookBtn = document.querySelector("#addBookBtn");
const closeBkFrmBtn = document.querySelector(".close-btn");
const inputForm = document.querySelector("#addBookForm");
const bookInfoModal = document.querySelector(".bookInformationModal");

let bookLibrary = [];

addBookBtn.addEventListener("click", function() {
  addBookForm.classList.add("show-modal");
});

closeBkFrmBtn.addEventListener("click", function() {
  addBookForm.classList.remove("show-modal");
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
  const infoBtn = document.createElement('button');
  const btnGroup = document.createElement('div');

  cardContainer.classList.add("cardContainerStyle");
  bookCover.classList.add("bookCover");
  removeBtn.classList.add("removeBtn");
  infoBtn.classList.add("bookInfoBtn");
  bookAuthor.classList.add("bookAuthorStyle");

  //Check if the book url is empty if empty then fill the src attirbute with the image provided if not go to default book cover image
  if ( book.url !== "" ) {
    bookCover.setAttribute("src", book.url);
    bookCover.setAttribute("height", "21px");
    bookCover.setAttribute("width", "21px");
  }

  bookTitle.textContent = `${book.title}`;
  bookAuthor.textContent = `${book.author}`;

  btnGroup.appendChild(removeBtn);
  btnGroup.appendChild(infoBtn);

  cardContainer.appendChild(btnGroup);
  cardContainer.appendChild(bookCover);
  cardContainer.appendChild(bookTitle);
  cardContainer.appendChild(bookAuthor);

  bookContainer.appendChild(cardContainer);
}

function createBookInfoModal( index ) {
  let bookAccess;

  for ( let i = 0; i < bookLibrary.length; ++i ) {

    if ( bookLibrary.indexOf(bookLibrary[i]) == index ) {
      bookAccess = bookLibrary[i];
    } 
  }

  const bookInfoTitle = document.querySelector('.title');
  const bookInfoCoverImage = document.querySelector('.image');
  const bookInfoAuthor = document.querySelector('.author');
  const bookPublishingDate = document.querySelector('.date');
  const bookNumberPages = document.querySelector('.pages');

  bookInfoTitle.textContent = `${bookAccess.title}`;
  bookInfoAuthor.textContent = `${bookAccess.author}`;
  bookPublishingDate.textContent = `${bookAccess.publishDate}`;
  bookNumberPages.textContent = `${bookAccess.pages}`;
  bookInfoCoverImage.setAttribute('src', "assets/images/Default_image.jpg")

  if ( bookAccess.url != "" ) {
    bookInfoCoverImage.src = `${bookAccess.url}`;
  }
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

function accessBookInformation() {
  const bookInfo = document.querySelectorAll(".bookInfoBtn");
  const bookInfoCloseBtn = document.querySelector("#closeBtn");
  
  for ( let i = 0; i < bookInfo.length; ++i ) {
    bookInfo[i].addEventListener('click', function() {
      bookInfoModal.classList.add("show");
      createBookInfoModal(i);
    })
  }

  bookInfoCloseBtn.addEventListener("click", function() {
    setTimeout( ()=> { bookInfoModal.classList.remove("show")}, 200 );
  })
}

document.querySelector("#addBookForm").addEventListener('submit', function() {
  event.preventDefault();
  gettingBookInfo();
  addBookForm.classList.remove("show-modal");
  inputForm.reset();
  createBookCard();
  removeBook();
  accessBookInformation();
})




