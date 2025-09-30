import { useState } from "react"
import { useDispatch } from "react-redux"
import { v4 as uuidv4 } from 'uuid'
import { addBook } from "../../redux/books/actionCreators"
import './BookForm.css'
import booksData from '../../data/books.json'


function BookForm() {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const dispatch = useDispatch()

    function handleAddRandomBook() {
        const randomIndex = Math.floor(Math.random() * booksData.length)
        const book = {
            ...booksData[randomIndex],
            id: uuidv4(),
            isFavorite: false
        }
        dispatch(addBook(book))
    }

    function handleSubmit(e) {
        e.preventDefault()

        if (title && author) {

            const book = {
                title,
                author,
                id: uuidv4(),
                isFavorite: false
            };
            dispatch(addBook(book));

            setAuthor('')
            setTitle('')
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
            </form>
        </div>
    )
}

export default BookForm