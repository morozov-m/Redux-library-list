import { useDispatch, useSelector } from 'react-redux'
import { BsBookmarkStar, BsBookmarkStarFill } from "react-icons/bs";
import './BookList.css'
import { deleteBook, toggleFavorite } from '../../redux/books/actionCreators'
import { selectFilter } from '../../redux/slices/filterSlice';

function BookList() {
    const books = useSelector(state => state.books)
    const filter = useSelector(selectFilter)
    const dispatch = useDispatch()

    function handleToggleFavorite(id) {
        dispatch(toggleFavorite(id))
    }

    function handleDeleteBook(id) {
        dispatch(deleteBook(id))
    }

    const filteredBooks = books.filter(book => {
        const matchesTitle = book.title.toLowerCase().includes(filter.title.toLowerCase())
        const matchesAuthor = book.author.toLowerCase().includes(filter.author.toLowerCase())
        return matchesAuthor && matchesTitle
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
                                {++index}. {book.title} by <strong>{book.author}</strong>
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