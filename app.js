const addBookForm = document.querySelector(".add-book-modal");
const addBookBtn = document.querySelector("#addBookBtn");
const closeBkFrmBtn = document.querySelector(".close-btn");
const inputForm = document.querySelector("#addBookForm");
const bookInfoModal = document.querySelector(".bookInformationModal");
const readStatus = document.querySelector("#readStatusBtn");
const genreList = document.querySelectorAll(".genre");

//The library books array
let bookLibrary = [];

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
  const readStatus = checkReadStatus();

  let newBook = new book(bookTitle, 
                         bookAuthor, 
                         bookPages, 
                         bookGenre, 
                         bookCoverUrl,
                         bookPublishDate,
                         readStatus
  )

  const status = document.querySelector("#readStatusBtn");
  status.addEventListener('click', function() {
    if ( newBook.bookStatus == "Read" ) {
      newBook.bookStatus = "Not read";
    } else if ( newBook.bookStatus == "Not read"){
      newBook.bookStatus = "Read";
    }
  });

  bookLibrary.push(newBook);
}

//This function is responsible for creating the bookcard and appending it inside of the book container
function createBookCard() { 

  let book;

  //We loop through the array to access the book information
  for ( let i = 0; i < bookLibrary.length; ++i ) {
    book = bookLibrary[i];
  }

  const bookContainer = document.querySelector("#book-container");

  //create the element
  const cardContainer = document.createElement("div");
  const bookTitle = document.createElement('p');
  const bookAuthor = document.createElement('p');
  const bookCover = document.createElement('img');
  const removeBtn = document.createElement('button');
  const infoBtn = document.createElement('button');
  const btnGroup = document.createElement('div');

  //Set data-filter atttribute to each container so later i can access it to filter 
  cardContainer.setAttribute("data-filter", "filter");

  //add the style 
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

  //Now append the styled element on the appropriate container
  btnGroup.appendChild(removeBtn);
  btnGroup.appendChild(infoBtn);

  cardContainer.appendChild(btnGroup);
  cardContainer.appendChild(bookCover);
  cardContainer.appendChild(bookTitle);
  cardContainer.appendChild(bookAuthor);


  //Append the cardcontainer to the main container which is the book container
  bookContainer.appendChild(cardContainer);
}

//This function is responsible for creating the book information modal
function createBookInfoModal( index ) {
  let bookAccess;

  //We loop throught the book library array to access information but instead of accessing the current book we acess the specific book click my the user
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
  const readStatusBtn = document.querySelector("#readStatusBtn");

  bookInfoTitle.textContent = `${bookAccess.title}`;
  bookInfoAuthor.textContent = `${bookAccess.author}`;
  bookPublishingDate.textContent = `${bookAccess.publishDate}`;
  bookNumberPages.textContent = `${bookAccess.pages}`;
  bookInfoCoverImage.setAttribute('src', "assets/images/Default_image.jpg");
  readStatusBtn.textContent = `${bookAccess.bookStatus}`;

  if ( bookAccess.url != "" ) {
    bookInfoCoverImage.src = `${bookAccess.url}`;
  }
}

//This function is responsible for removing the book
function removeBook() {
  const rmvBtn = document.querySelectorAll(".removeBtn");
  const list = document.querySelectorAll(".cardContainerStyle");

  for ( let x = 0; x < rmvBtn.length; ++x ) {
    //When the remove btn is clicked it will activate and remove the card container inside the book container
    rmvBtn[x].addEventListener('click', () => {
      //This property remove the child element from the parent element
      list[x].parentElement.removeChild(list[x]);
    })
  }
}

//What this function does is check the status of the book
function checkReadStatus() {
  if ( document.querySelector("#read-status").checked ) {
    return "Read";
  } else {
    return "Not read";
  }
}

//This function is responsible for accessing the book information
function accessBookInformation() {
  const bookInfo = document.querySelectorAll(".bookInfoBtn");
  const bookInfoCloseBtn = document.querySelector("#closeBtn");
  
  //It loop through the access info icon 
  for ( let i = 0; i < bookInfo.length; ++i ) {
    bookInfo[i].addEventListener('click', function() {
      bookInfoModal.classList.add("show");
      //This function get the i variable which access the index of the access info icon and it will be used by this function
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


genreList.forEach( ( item ) => {

  const bookCon = document.getElementsByTagName('#book-container div');

  item.addEventListener("click", function() {
    //Activate the button
    genreList.forEach( (item) => {
      item.classList.remove("activate-genre-btn")
    })  
    item.className = "activate-genre-btn";

    console.log( bookCon);
 
  })
  
})

//This addeventlistener listen to the user when they click the add book button
addBookBtn.addEventListener("click", function() {
  addBookForm.classList.add("show-modal");
});

closeBkFrmBtn.addEventListener("click", function() {
  addBookForm.classList.remove("show-modal");
});

