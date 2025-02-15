const baseUrl = 'https://striveschool-api.herokuapp.com/books'

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

function renderBooks(books){


    const listSection = document.getElementById('listSection')
    const listCol = document.createElement('div')
    listCol.classList.add('col-6', 'col-md-4', 'col-lg-3')
    listSection.appendChild(listCol)

    const bookCard  = document.createElement('div')
    bookCard.classList.add('card')
    const bookCover  = document.createElement('img')
    bookCover


    
}

getBooks()