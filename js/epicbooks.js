const baseUrl = 'https://striveschool-api.herokuapp.com/books'
const listSection = document.getElementById('listSection')

let allBooks = []

function getBooks() {
    return fetch(baseUrl)
    .then(response => response.json())
    .then((books) => {
        console.log(books)
        allBooks = books
        renderBooks(books)})
        .catch(error => alert(error))
}

function renderBooks(myBooks){
    listSection.innerHTML = ""

    const colBooks = myBooks.map((book) => createCols(book))

    listSection.append(...colBooks)
}
    
function createCols ({img, title, category, price}) {
    const listCol = document.createElement('div')
    listCol.className = 'col col-md-4 col-lg-3 g-3'

    const bookCard  = document.createElement('div')
    bookCard.className = 'card'
    listCol.appendChild(bookCard)
    
    const bookCover  = document.createElement('img')
    bookCover.className = 'card-img-top'
    bookCover.src = img
    bookCard.appendChild(bookCover)


    const bookTitle = document.createElement('h5')
    bookTitle.className = 'card-title'
    bookTitle.innerText = title
    bookCard.appendChild(bookTitle)


    const bookCategory = document.createElement('h6')
    bookCategory.className = 'card-subtitle'
    bookCategory.innerText = category
    bookCard.appendChild(bookCategory)


    const bookPrice = document.createElement('p')
    bookPrice.className = 'card-text'
    bookPrice.innerText = price
    bookCard.appendChild(bookPrice)


    const divButtons = document.createElement('div')
    divButtons.classList.add('d-flex')
    bookCard.appendChild(divButtons)

    const addToCartButton = document.createElement('button')
    addToCartButton.className = 'btn btn-primary mx-1'
    addToCartButton.innerText = 'Aggiungi al Carrello'
    divButtons.appendChild(addToCartButton)

    //addToCartButton.addEventListener('click', addToCart(book))


    const jumpButton = document.createElement('button')
    jumpButton.className = 'btn btn-secondary mx-1'
    jumpButton.innerText = 'Salta prodotto'
    divButtons.appendChild(jumpButton)


    return listCol

    
}

function addToCart () {

}

getBooks()