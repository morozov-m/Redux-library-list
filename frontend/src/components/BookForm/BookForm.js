import { useState } from "react"
import { useDispatch } from "react-redux"
import axios from 'axios'
import './BookForm.css'
import booksData from '../../data/books.json'
import { createBookWithId } from "../../utils/createBookWithId"
import { addBook } from "../../redux/slices/booksSlice"


function BookForm() {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const dispatch = useDispatch()

    function handleAddRandomBook() {
        const randomIndex = Math.floor(Math.random() * booksData.length)
        const book = createBookWithId(booksData[randomIndex], 'random')
        dispatch(addBook(book))
    }

    async function handleAddRandomBookViaApi() {
        try {
            const res = await axios.get('http://localhost:4000/random-book')
            if (res?.data?.title && res?.data?.author) {
                dispatch(addBook(createBookWithId(res.data, 'api')))
            }
        } catch (error) {
            console.log('Error fetching random book', error)
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
                <button onClick={handleAddRandomBookViaApi} type="button">Add Random via API</button>
            </form>
        </div>
    )
}

export default BookForm