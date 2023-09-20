const addBookForm = document.querySelector(".add-book-modal");
const addBookBtn = document.querySelector("#addBookBtn");
const closeBkFrmBtn = document.querySelector(".close-btn");

addBookBtn.addEventListener("click", function() {
  addBookForm.classList.add("show-add-book-form");
});

closeBkFrmBtn.addEventListener("click", function() {
  addBookForm.classList.remove("show-add-book-form");
});