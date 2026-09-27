const btn = document.querySelector(".newBookBtn");
const submitBtn = document.querySelector(".submit");

const form = document.querySelector(".newBook");
const div = document.querySelector("div");

const bookTitle = document.querySelector("#bookTitle");
const bookAuthor = document.querySelector("#bookAuthor")
const bookPages = document.querySelector("#bookPages")
const bookRead = document.querySelector("#bookRead")


const myDialog = document.querySelector("#book-dialog");
const tbody = document.querySelector("tbody");
const myLibrary = [];

// function Book(id, title, author, pages, read){
//     if(!new.target){
//         throw Error("please use NEW to call the constructor");
//     }
//     this.id = id;
//     this.title = title;
//     this.author= author;
//     this.pages= pages;
//     this.read= read;
// };

class Book{
    constructor(id, title, author, pages, read){
        this.id = id;
        this.title = title;
        this.author= author;
        this.pages= pages;
        this.read= read;
    }
}

Book.prototype.readState = function(){
    if(!this.read){
        this.read = true;
    }else{
        this.read = false;
    }
};

function addBookToLibrary(title, author, pages, read){
    const newBookId = crypto.randomUUID();
    const newBook = new Book(newBookId, title,author, pages, read);
    myLibrary.push(newBook);
};

function displayBooks(){
    tbody.replaceChildren();
for(let i = 0; i < myLibrary.length; i++){
        const tr = document.createElement("tr");
        const td1 = document.createElement("td");
        const td2 = document.createElement("td");
        const td3 = document.createElement("td");
        const td4 = document.createElement("td");
        const td5 = document.createElement("td");

        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.setAttribute("data-unique-id", myLibrary[i].id);
        removeBtn.setAttribute("class", "remove");
        
        const readbtn = document.createElement("button");
        readbtn.setAttribute("data-unique-id", myLibrary[i].id);

        if (myLibrary[i].read){
            readbtn.textContent = "Read";
        }else{
            readbtn.textContent = "Unread";
        }
        readbtn.addEventListener("click", () =>{

                myLibrary[i].readState();
                console.log(myLibrary[i])

            displayBooks();
        });
        
        
        td1.textContent = myLibrary[i].title;
        td2.textContent = myLibrary[i].author;
        td3.textContent = myLibrary[i].pages;

        td4.appendChild(removeBtn);
        td5.appendChild(readbtn);


        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tbody.appendChild(tr);
        removeBtn.addEventListener("click", ()=>{
        for(let i = 0; i < myLibrary.length; i++){
            if(removeBtn.dataset.uniqueId == myLibrary[i].id){
                myLibrary.splice(i, 1);
                displayBooks();
                break;
        };
    };
}); 
};
};

submitBtn.addEventListener("click", (event) => {
    event.preventDefault();
    addBookToLibrary(bookTitle.value, bookAuthor.value, bookPages.value, bookRead.checked);
    // bookTitle.value = "";
    // bookAuthor.value = "";
    // bookPages.value = "";
    form.reset();
    myDialog.close();
    displayBooks();
});




