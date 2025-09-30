import { useDispatch, useSelector } from 'react-redux'
import { BsBookmarkStar, BsBookmarkStarFill } from "react-icons/bs";
import './BookList.css'
import { selectFilter } from '../../redux/slices/filterSlice';
import { selectBooks, toggleFavorite, deleteBook } from '../../redux/slices/booksSlice';

function BookList() {
    const books = useSelector(selectBooks)
    const filter = useSelector(selectFilter)
    const dispatch = useDispatch()

    function handleToggleFavorite(id) {
        dispatch(toggleFavorite(id))
    }

    function handleDeleteBook(id) {
        dispatch(deleteBook(id))
    }

    function highlightMatch(text, filter) {
        if (!filter) return text

        const regex = new RegExp(`(${filter})`, 'gi')

        return text.split(regex).map((substring, idx) => {
            if (substring.toLowerCase() === filter.toLowerCase()) {
                return (
                    <span key={idx} className='highlight'>
                        {substring}
                    </span>
                )
            }
            return substring
        })
    }

    const filteredBooks = books.filter(book => {
        const matchesTitle = book.title.toLowerCase().includes(filter.title.toLowerCase())
        const matchesAuthor = book.author.toLowerCase().includes(filter.author.toLowerCase())
        const machesFavorite = filter.onlyFavorite ? book.isFavorite : true
        return matchesAuthor && matchesTitle && machesFavorite
    })

    return (
        <div className="app-block book-list">
            <h2>Book List</h2>
            {filteredBooks.length === 0 ? (
                <p>No books avaliable</p>
            ) : (
                <ul>
                    {filteredBooks.map((book, index) =>
                        <li key={book.id}>
                            <div className='book-info'>
                                {++index}. {highlightMatch(book.title, filter.title)} by <strong>{highlightMatch(book.author, filter.author)}</strong>
                            </div>
                            <div className='book-actions'>
                                <span onClick={() => handleToggleFavorite(book.id)}>
                                    {book.isFavorite ? <BsBookmarkStarFill className='star-icon' />
                                        : <BsBookmarkStar className='star-icon' />}
                                </span>
                                <button onClick={() => handleDeleteBook(book.id)}>Delete</button>
                            </div>
                        </li>)}
                </ul>
            )}
        </div>
    )
}

export default BookList