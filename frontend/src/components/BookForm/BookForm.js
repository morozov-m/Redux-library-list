import { useState } from "react"
import { useDispatch } from "react-redux"
import { FaSpinner } from "react-icons/fa";
import './BookForm.css'
import booksData from '../../data/books.json'
import { createBookWithId } from "../../utils/createBookWithId"
import { addBook, fetchBook } from "../../redux/slices/booksSlice"
import { setError } from "../../redux/slices/errorSlice"


function BookForm() {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)

    function handleAddRandomBook() {
        const randomIndex = Math.floor(Math.random() * booksData.length)
        const book = createBookWithId(booksData[randomIndex], 'random')
        dispatch(addBook(book))
    }

    async function handleAddRandomBookViaApi() {
        try {
            setIsLoading(true)
            await dispatch(fetchBook('http://localhost:4000/random-book-delayed'))
        } finally {
            setIsLoading(false)
        }
    }

    function handleSubmit(e) {
        e.preventDefault()
        if (title && author) {
            const book = createBookWithId({ title, author }, 'manual')
            dispatch(addBook(book));
            setAuthor('')
            setTitle('')
        }
        else {
            dispatch(setError('U must fill title and author.'))
        }
    }

    return (
        <div className="app-block book-form">
            <h2>Add a New Book</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title: </label>
                    <input type="text" id="title" value={title} onChange={e => setTitle(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="author">Author: </label>
                    <input type="text" id="author" value={author} onChange={e => setAuthor(e.target.value)} />
                </div>
                <button type="submit">Add Book</button>
                <button onClick={handleAddRandomBook} type="button">Add Random</button>
                <button onClick={handleAddRandomBookViaApi} disabled={isLoading} type="button">
                    {isLoading ? (
                        <>
                            <span>Loading</span>
                            <FaSpinner className="spinner" />
                        </>
                    ) : 'Add Random via API'}

                </button>
            </form>
        </div>
    )
}

export default BookForm