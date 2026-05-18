const myLibrary = [];

// book class constructor
class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID(); // unique ID for each object created with this constructor. Read up data-attributes
  }
}

function addBookToLibrary(title, author, pages, read) {
  // take params, create a book then store it in the array
  const book = new Book(title, author, pages, read);
  myLibrary.push(book); // push the new book object to the library array with info method
}

function displayLibrary() {
  // function to create the contents of each book and display it (the library).
  const library = document.querySelector(".library");
  library.textContent = ""; // clear the library when called so as to not repeat contents
  myLibrary.forEach((book) => {
    const cardDiv = document.createElement("div"); // Div to serve as card for each book
    cardDiv.classList.add("libraryCard");

    const title = document.createElement("h3");
    title.textContent = book.title;

    const author = document.createElement("p");
    author.textContent = `By: ${book.author}`;

    const pages = document.createElement("p");
    pages.textContent = `${book.pages} pages`;

    const read = document.createElement("p");
    read.textContent = `Read? :  ${book.read}`;

    const toggleBtn = document.createElement("button"); // create a button to toggle read status
    toggleBtn.classList.add("toggleBtn");
    toggleBtn.textContent =
      book.read === "Yes"
        ? (toggleBtn.textContent = "Mark unread ❌")
        : (toggleBtn.textContent = "Mark read ✅");
    // the above code changes the toggle button content to 'mark read' when the
    // read status is 'No' or 'None selected' and to "mark unread" when the read status is 'yes'
    if (toggleBtn.textContent === "Mark read ✅") {
      // make the background-colors change according to button content
      toggleBtn.style.backgroundColor = "rgb(55, 151, 240)";
    } else {
      toggleBtn.style.backgroundColor = "lightgrey";
    }
    toggleBtn.addEventListener("click", () => {
      // add event listener to toggle when pressed
      book.read = book.read === "Yes" ? "No" : "Yes"; // when the button is pressed it changes to 'No' or 'Yes' depending on the value at the time
      displayLibrary(); // calls the function again to effect change.
    });
    const removeBtn = document.createElement("button"); // create a remove button.
    removeBtn.classList.add("removeBtn");
    removeBtn.textContent = "Remove book";

    const id = book.id; // assign each book id a particular variable(id) so it doesn't change.
    removeBtn.addEventListener("click", () => {
      let index = myLibrary.findIndex((book) => book.id == id); //find the index of the id
      myLibrary.splice(index, 1); // delete the card from the array
      displayLibrary(); // call the function again to effect change.
    });
    cardDiv.append(title, author, pages, read, toggleBtn, removeBtn); // append all the created elements to the parent(Card)
    library.appendChild(cardDiv); // append the card to the screen.
  });
}

const dialog = document.querySelector("dialog");
const addBookToLib = document.querySelector(".addBookToLib");
addBookToLib.addEventListener("click", () => {
  // event listener to show dialog modal
  dialog.showModal();
});

const cancelBtn = dialog.querySelector(".cancel");
cancelBtn.classList.add("cancelBtn");
cancelBtn.addEventListener("click", () => {
  // event listener to close dialog modal
  dialog.close();
  form.reset(); // resets all the input and radio values when cancelled.
});

const form = document.querySelector("#form");
form.addEventListener("submit", (event) => {
  // this is to prevent the default form submission.
  event.preventDefault();
});

const addBookBtn = dialog.querySelector(".add");
addBookBtn.classList.add("addBookBtn");
addBookBtn.addEventListener("click", () => {
  // event listener for the add book button
  validateInput(); // to validate the input and add book to library.
  displayLibrary(); // call the library function to show the book(s) when it is added.
  dialog.close();
  form.reset(); // resets all the input and radio values when a book is added to start form input afresh.
});

function validateInput() {
  // function to validate input and add to library
  const title = dialog.querySelector("#title");
  const author = dialog.querySelector("#author");
  const page = dialog.querySelector("#pages");
  const read = document.querySelector('input[name="read"]:checked');

  if (title.validity.valueMissing) {
    // this is to check user title Input
    title.setCustomValidity("The title cannot be empty");
    preventDefault();
  } else {
    title.setCustomValidity(""); // if there's a value, continue.
  }
  if (author.validity.valueMissing) {
    author.setCustomValidity("Author's name cannot be empty");
    preventDefault();
  } else {
    author.setCustomValidity("");
  }
  if (page.validity.valueMissing) {
    page.setCustomValidity("Page number cannot be empty");
    preventDefault();
  } else {
    page.setCustomValidity("");
  }
  let selectedValue;
  if (read) {
    // if the read radio button is marked
    selectedValue = read.value;
  } else {
    // display when no value is selected
    selectedValue = "None selected";
  }
  addBookToLibrary(title.value, author.value, page.value, selectedValue);
}
