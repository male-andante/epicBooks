const baseUrl = 'https://striveschool-api.herokuapp.com/books'

const listSection = document.getElementById('listSection')
const cartSection = document.getElementById('cartSection')
const inputSearch = document.getElementById('inputSearch')
const submitButton = document.getElementById('submitButton')

let allBooks = []
let cartItems = [] // Array per il carrello

// const cardOverlay = document.querySelector('.card-img-top').style.border = ""
// '8px solid red'


function getBooks() {
    return fetch(baseUrl)
        .then(response => response.json())
        .then((books) => {
            console.log(books)
            allBooks = books
            renderBooks(books)
        })
        .catch(error => alert(error))
}

function renderBooks(myBooks) {
    listSection.innerHTML = ""

    const colBooks = myBooks.map((book) => createCols(book))

    listSection.append(...colBooks)
}

function createCols({ img, title, category, price }) {
    const listCol = document.createElement('div')
    listCol.className = 'col col-md-4 col-lg-3 g-3'

    const bookCard = document.createElement('div')
    bookCard.className = 'card'
    listCol.appendChild(bookCard)

    const bookCover = document.createElement('img')
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
    addToCartButton.addEventListener('click', () => addToCart(title, img, price)) // callback


    const jumpButton = document.createElement('button')
    jumpButton.className = 'btn btn-secondary mx-1'
    jumpButton.innerText = 'Salta prodotto'
    divButtons.appendChild(jumpButton)


    return listCol


}

function addToCart(title, img, price) {
    const addedBook = { title, img, price }
    cartItems.push(addedBook)
    cardProperty.

    renderCart()
}

function removeFromCart(index) {
    cartItems.splice(index, 1)
    renderCart()
}

function renderCart(){
    cartSection.innerHTML = ""

        /*const cartCols = cartItems.map(book => createCols(book)) 
        cartSection.append(...cartCols) Provare a farlo così, aggiungendo in cartCols la gestione del bottone di rimozione del carrello. */
    

    cartItems.forEach(({ img, title, category, price }, index) => {
        const cartItem = document.createElement('div')
        cartItem.className = 'cart-item d-flex align-items-center my-2'

        const cartImg = document.createElement('img')
        cartImg.src = img
        cartImg.className = 'cart-img me-2'
        cartImg.style.width = '50px'
        cartItem.appendChild(cartImg)

        const cartTitle = document.createElement('span')
        cartTitle.innerText = `${title} - ${price}€`
        cartItem.appendChild(cartTitle)

        const removeButton = document.createElement('button')
        removeButton.className = 'btn btn-danger btn-sm ms-2'
        removeButton.innerText = 'Rimuovi'
        removeButton.addEventListener('click', () => removeFromCart(index))
        cartItem.appendChild(removeButton)

        cartSection.appendChild(cartItem)
    })
}

function filterBook() {
    const searchValue = inputSearch.value.trim().toLowerCase()
    if (searchValue.length >= 2) {
        const filteredBooks = allBooks.filter(
            (book) => {
                if (book.title.toLowerCase().includes(searchValue) || book.category.toLowerCase().includes(searchValue)) {
                    return true
                }
                return false
            }
        )
        renderBooks(filteredBooks)
    }
}

inputSearch.addEventListener('keyup', filterBook)

/*function findBook(event) {
    event.preventDefault()
    const bookTitle = inputSearch.value.toLowerCase()
    const foundBook = allBooks.find(book => book.title.toLowerCase() === bookTitle)
    if (foundBook) {
        renderBooks([foundBook])
    } else {
        alert('Libro non trovato')
    }
}
}*/

getBooks()