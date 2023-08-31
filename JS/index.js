const books = [
    {
        id: 1,
        title: "El Gran Gatsby",
        descriptions: "La historia del millonario Jay Gatsby y su obsesión por el pasado.",
        imageUrl: "https://m.media-amazon.com/images/I/61hR5wwWGuS._AC_UF1000,1000_QL80_.jpg",
        price: 2000
    },
    {
        id: 2,
        title: "Cien años de soledad",
        descriptions: "La saga de la familia Buendía a lo largo de siete generaciones en el pueblo de Macondo.",
        imageUrl: "https://m.media-amazon.com/images/I/91TvVQS7loL._AC_UF1000,1000_QL80_.jpg",
        price: 2000
    },
    {
        id: 3,
        title: "Matar a un ruiseñor",
        descriptions: "La historia de Atticus Finch y sus hijos mientras luchan contra el racismo en el sur de los Estados Unidos.",
        imageUrl: "https://m.media-amazon.com/images/I/51dxA6YXFzL._AC_UF1000,1000_QL80_.jpg",
        price: 2000
    },
    {
        id: 4,
        title: "1984",
        descriptions: "Una novela distópica que describe un mundo totalitario y vigilante.",
        imageUrl: "https://images.penguinrandomhouse.com/cover/9788418915093",
        price: 2000
    },
    {
        id: 5,
        title: "Orgullo y prejuicio",
        descriptions: "La historia de Elizabeth Bennet y su relación con el señor Darcy en la Inglaterra del siglo XIX.",
        imageUrl: "https://m.media-amazon.com/images/I/71wnBzT9WqL._AC_UF1000,1000_QL80_.jpg",
        price: 3000
    },
    {
        id: 6,
        title: "Don Quijote de la Mancha",
        descriptions: "Las aventuras del caballero Don Quijote y su fiel escudero Sancho Panza en una sátira literaria.",
        imageUrl: "https://m.media-amazon.com/images/I/91zpNPYRFeL._AC_UF1000,1000_QL80_.jpg",
        price: 3000
    },
    {
        id: 7,
        title: "Los juegos del hambre",
        descriptions: "La historia de Katniss Everdeen en un mundo distópico donde jóvenes son forzados a luchar por su supervivencia en un juego mortal.",
        imageUrl: "https://m.media-amazon.com/images/I/51h3YpAz6rL._AC_UF1000,1000_QL80_.jpg",
        price: 1000
    },
    {
        id: 8,
        title: "Crónica de una muerte anunciada",
        descriptions: "La narración de un asesinato en una pequeña comunidad y la inevitabilidad del mismo.",
        imageUrl: "https://m.media-amazon.com/images/I/91BaE11qAgL._AC_UF1000,1000_QL80_.jpg",
        price: 1000
    },
    {
        id: 9,
        title: "Moby-Dick",
        descriptions: "La obsesión del capitán Ahab por cazar al gran cachalote blanco conocido como Moby-Dick.",
        imageUrl: "https://m.media-amazon.com/images/I/81R91ODA9DL._AC_UF1000,1000_QL80_.jpg",
        price: 2000
    }
];

function createBookCard(book) {
    return `
    <div class="card mh-100 col-4 m-2 p-3">
        <img src="${book.imageUrl}" class="card-img-top" alt="${book.title}" style="height: 400px;">
        <div class="card-body">
            <h5 class="card-title border-bottom p-1">${book.title}</h5>
            <p class="card-text">${book.descriptions}</p>
            <p class="card-text fw-bold">Precio: $${book.price.toFixed(2)}</p>
            <div class="d-flex justify-content-end">
                <button class="btn btn-primary" onclick="addToCart(${book.id})">Agregar al carrito</button>
            </div>
        </div>
    </div>
  `;
}

if (window.location.href.includes('shoppingCart.html')) {
    const containerBooks = document.getElementById("books-list-container");
    const booksHTML = books.map(createBookCard).join("");
    containerBooks.innerHTML = booksHTML;
}

const BooksManager = {
    getBooks() {
        const librosStr = localStorage.getItem('books');
        return librosStr ? JSON.parse(librosStr) : {};
    },

    setBooks(libroId) {
        const libros = this.getBooks();
        if (libros[libroId]) {
            libros[libroId]++;
        } else {
            libros[libroId] = 1;
        }
        localStorage.setItem('books', JSON.stringify(libros));
    },

    deleteBooks(libroId) {
        const libros = this.getBooks();
        if (libros[libroId]) {
            if (libros[libroId] > 1) {
                libros[libroId]--;
            } else {
                delete libros[libroId];
            }
            localStorage.setItem('books', JSON.stringify(libros));
        }
    }
};

function addToCart(libroId) {
    BooksManager.setBooks(libroId);
}

function createCardBookCard(book) {
    return `
        <tr>
            <td>${book.name}</td>
            <td>${book.quantity}</td>
            <td>${book.price}</td>
            <td>${book.price * book.cuantiti}</td>
            <td>
                <button class="btn btn-danger" onclick="deleteToCart(${book.id})">Eliminar</button>
            </td>
        </tr>
  `;
}

function createTableCard(){
    const dataBooks = BooksManager.getBooks();
    const booksHTML = books.map((libro) => {
        if(dataBooks[libro.id]) createCardBookCard({...libro, quantity: dataBooks[libro.id]})
    }).join("");
    const containerCard = document.getElementById("card-list-container");
    containerCard.innerHTML = booksHTML;
}

if (window.location.href.includes('listProducts.html')) createTableCard();


function deleteToCart(libroId) {
    BooksManager.deleteBooks(libroId);
    createTableCard();
}
