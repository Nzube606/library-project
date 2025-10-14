const myLibrary = [];

// book constructor
function Book(title, author, pages, read ) {
  this.title = title,
  this.author = author,
  this.pages = pages;
  this.read = read;
}

// Add method to the book prototype so other object instances can have access
Book.prototype.info = function () {
  let bookProp = `Title:    ${this.title} \n
  Author:    ${this.author} \n
  Number of pages:    ${this.pages} \n
  Read status:    ${this.read}.  ` ;
  // this.id;
  let bookId = crypto.randomUUID(); // unique ID for each object created with this constructor. Read up data-attributes
    return {bookProp, bookId};  //returns as an object
    };
    // const bookInfo = Book.info();

function addBookToLibrary(title, author, pages, read) {
  // take params, create a book then store it in the array
  let book = new Book(title, author, pages, read);
  // console.log(book.id)
  // let bookInfo = book.info();
  myLibrary.push(book.info()); // push the new book object to the library array with info method
}

// addBookToLibrary('Rich Dad', "Rowling", 499, 'Yes');
// addBookToLibrary('Poor Dad', "J.K", 500, 'No');
// console.log(myLibrary);

// displayLibrary()  
const library = document.querySelector('.library');
const form = document.querySelector('#form');
const dialog = document.querySelector('dialog')
const libraryCard = document.querySelector('.library-card');
const addBookToLib = document.querySelector('.addBookToLib');
const cancelBtn = dialog.querySelector('.cancel');
const addBookBtn = dialog.querySelector('.add');
const titleBox = dialog.querySelector('input[name="title"]');
const authorBox = dialog.querySelector('input[name="author"]');
const pageBox = dialog.querySelector('input[name="pages"]');
const radios = document.querySelectorAll('input[name="read"]');
const removeBtns = document.querySelectorAll('.removeBtn')
// const readBox = document.querySelector('input[name="read"]');
// libraryCard.style.display = 'hidden';
// removeBtns.forEach(removeBtn => {
  //   removeBtn.addEventListener('click', () => {
    //     console.log('button-press')
    //     library.removeChild(CardDiv);
    //   })
    // })
    radios.forEach(radio => {
      radio.addEventListener('click', () => {
        // if(radio.checked){
         readBox = radio.value;
        // }
        // else {
        //   readBox = 'None selected';
        // }
      })
    });

    function displayLibrary(){
        library.textContent = "" // clear the library when called so as to not repeat contents 
        myLibrary.forEach(book => {
          const cardDiv = document.createElement('div');
          cardDiv.classList.add('libraryCard');
          cardDiv.textContent = book.bookProp;
          // create a button to toggle read status
          const toggleBtn = document.createElement('button');
          const readStatus = book.bookProp.read;
          console.log(readStatus);
          toggleBtn.textContent = `Read: ${book.t}`;
          toggleBtn.classList.add('toggleBtn');
          // add event listener to toggle when pressed
          toggleBtn.addEventListener('click', () => {
            // let readStatusPosition = book.bookProp.this.;
            this.read === "Yes" ? 'No' : 'Yes';
            this.read === 'No' ? 'Yes' : "No" ;
          })
          const removeBtn = document.createElement('button'); // create a remove button
          removeBtn.classList.add('removeBtn');
          removeBtn.textContent = "Remove";
          // loop through the array of objects, myLibrary and get the index
          const index = myLibrary.findIndex(book => book.bookId); 
          removeBtn.addEventListener('click', () => {
            library.removeChild(cardDiv); // make the card to disappear from screen
            myLibrary.splice(index, 1); // delete the card from the array
            // library.textContent = "";
    
          });
          cardDiv.appendChild(toggleBtn);
          cardDiv.appendChild(removeBtn);
          library.appendChild(cardDiv);
        })
    }

    // const bookTitle = titleBox.textContent;
// const bookAuthor = authorBox.textContent;
// const bookPages = pageBox.textContent;
// const readBook = readBox.textContent;
// addBookToLib.addEventListener('click', displayLibrary);
addBookToLib.addEventListener('click', () => {
  dialog.showModal();
  // console.log("hi")
  
})
cancelBtn.addEventListener('click', () => {
  dialog.close();
  form.reset() ;
})

form.addEventListener('submit', (event) => {
  event.preventDefault()
})
addBookBtn.addEventListener('click', () => {
  readBox = "None selected";
  radios.forEach(radio => {
    if(radio.checked) {
      readBox = radio.value;
    }
  });
  addBookToLibrary(titleBox.value, authorBox.value, pageBox.value, readBox);
  // console.log(myLibrary)
  // addBookToLibrary(bookTitle, bookAuthor, bookPages, readBook);

  displayLibrary();
  dialog.close();
  form.reset(); // resets all the input and radio values
})