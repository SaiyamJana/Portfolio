// Retrieve books from localStorage if available, otherwise use an empty array
let books = JSON.parse(localStorage.getItem('books')) || [];

// Update Clock Function
function updateClock() {
    const clockElement = document.getElementById('digitalClock');
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    clockElement.textContent = `${hours}:${minutes}:${seconds}`;
}

setInterval(updateClock, 1000);
updateClock();

// Book Form Submission
document.getElementById('book-form').addEventListener('submit', function (e) {
    e.preventDefault();
    
    // Gather book details
    const title = document.getElementById('book-title').value;
    const author = document.getElementById('author-name').value;
    const date = document.getElementById('published-date').value;
    const info = document.getElementById('book-info').value;
    const shelf = document.getElementById('shelf-location').value;
    const availability = document.getElementById('online-availability').value;

    // Create book object
    const newBook = { title, author, date, info, shelf, availability };

    // Store book in array
    books.push(newBook);
    localStorage.setItem('books', JSON.stringify(books)); // Save to localStorage

    // Display book in preview
    const preview = document.getElementById('book-preview');
    preview.innerHTML = `<h3>${title}</h3>
        <p><strong>Author:</strong> ${author}</p>
        <p><strong>Published Date:</strong> ${date}</p>
        <p><strong>Information:</strong> ${info}</p>
        <p><strong>Shelf Location:</strong> ${shelf}</p>
        <p><strong>Available Online:</strong> ${availability}</p>`;

    // Clear the form
    document.getElementById('book-form').reset();

    // Update the book list
    updateBookList();
});

// Update the book list
function updateBookList() {
    const bookList = document.getElementById('book-list');
    bookList.innerHTML = ''; // Clear the existing list

    books.forEach((book, index) => {
        const bookDiv = document.createElement('div');
        bookDiv.classList.add('book-item');
        bookDiv.innerHTML = `
            <div class="book-details">
                <h3>${book.title}</h3>
                <p><strong>Author:</strong> ${book.author}</p>
                <p><strong>Published Date:</strong> ${book.date}</p>
                <p><strong>Information:</strong> ${book.info}</p>
                <p><strong>Shelf Location:</strong> ${book.shelf}</p>
                <p><strong>Available Online:</strong> ${book.availability}</p>
            </div>
            <button class="delete-button" data-index="${index}">Delete</button>
        `;
        bookList.appendChild(bookDiv);
    });

    // Add delete button functionality
    const deleteButtons = document.querySelectorAll('.delete-button');
    deleteButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            deleteBook(index);
        });
    });
}

// Delete book from the array and localStorage
function deleteBook(index) {
    books.splice(index, 1); // Remove book from array
    localStorage.setItem('books', JSON.stringify(books)); // Update localStorage
    updateBookList(); // Refresh the book list
}

// Search Functionality
const searchInput = document.getElementById('searchInput');
const suggestionsBox = document.querySelector('.suggestions-box');

// Display suggestions as user types
searchInput.addEventListener('input', function () {
    const query = searchInput.value.toLowerCase();
    suggestionsBox.innerHTML = ''; // Clear previous suggestions

    // Filter books that match the query
    const matchedBooks = books.filter(book => book.title.toLowerCase().includes(query));

    // Display suggestions if matches are found
    if (matchedBooks.length > 0) {
        suggestionsBox.style.display = 'block';
        matchedBooks.forEach(book => {
            const suggestionItem = document.createElement('div');
            suggestionItem.classList.add('suggestion-item');
            suggestionItem.textContent = book.title;
            
            // Scroll to book on suggestion click
            suggestionItem.addEventListener('click', () => {
                suggestionsBox.style.display = 'none'; // Hide suggestions
                searchInput.value = book.title; // Set input to selected title

                // Scroll to and highlight the book preview
                const preview = document.getElementById('book-preview');
                preview.scrollIntoView({ behavior: 'smooth', block: 'center' });
                preview.style.backgroundColor = '#ffffcc'; // Highlight color
                setTimeout(() => {
                    preview.style.backgroundColor = '#e0f7fa'; // Reset color
                }, 1500);
            });

            suggestionsBox.appendChild(suggestionItem);
        });
    } else {
        // Display "No results found" when no matches are found
        suggestionsBox.style.display = 'block';
        const noResultsMessage = document.createElement('div');
        noResultsMessage.classList.add('no-results');
        noResultsMessage.textContent = 'No books found';
        suggestionsBox.appendChild(noResultsMessage);
    }
});

// Hide suggestions box when clicking outside
document.addEventListener('click', function (e) {
    if (!suggestionsBox.contains(e.target) && e.target !== searchInput) {
        suggestionsBox.style.display = 'none';
    }
});

// Load books on page load
updateBookList();

