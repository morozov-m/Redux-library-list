import { useDispatch, useSelector } from 'react-redux'
import './Filter.css'
import { resetFilters, selectFilter, setAuthorFilter, setTitleFilter } from '../../redux/slices/filterSlice'


function Filter() {
    const dispatch = useDispatch()
    const filter = useSelector(selectFilter)

    function handleTitleFilterChange(e) {
        dispatch(setTitleFilter(e.target.value))
    }

    function handleAuthorFilterChange(e) {
        dispatch(setAuthorFilter(e.target.value))
    }

    function handleResetFilters() {
        dispatch(resetFilters())
    }

    return (
        <div className="app-block filter">
            <div className='filter-row'>
                <div className='filter-group'>
                    <input id='title' value={filter.title} onChange={handleTitleFilterChange} type='text' placeholder='Filter by title' />
                </div>
                <div className='filter-group'>
                    <input id='author' value={filter.author} onChange={handleAuthorFilterChange} type='text' placeholder='Filter by author' />
                </div>
                <button type='button' onClick={handleResetFilters}>Reset Filters</button>
            </div>
        </div>
    )
}

export default Filter