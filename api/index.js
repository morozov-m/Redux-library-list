const express = require('express');
const cors = require('cors');
const booksData = require('./data/books.json'); // Import the book data

const app = express();

function getRndomBook() {
    const randomIndex = Math.floor(Math.random() * booksData.length);
    const randomBook = booksData[randomIndex];
    return randomBook
}

app.use(cors());
app.get('/random-book', (req, res) => {
    res.json(getRndomBook());
});

app.get('/random-book-delayed', (req, res) => {
    setTimeout(() => {
        res.json(getRndomBook());
    }, 2000)
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});