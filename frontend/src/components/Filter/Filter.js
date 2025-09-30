import { useDispatch, useSelector } from 'react-redux'
import './Filter.css'
import { resetFilters, selectFilter, setTitleFilter } from '../../redux/slices/filterSlice'


function Filter() {
    const dispatch = useDispatch()
    const filter = useSelector(selectFilter)

    function handleTitleFilterChange(e) {
        dispatch(setTitleFilter(e.target.value))
    }

    function handleResetFilters() {
        dispatch(resetFilters())
    }

    return (
        <div className="app-block filter">
            <div className='filter-row'>
                <div className='filter-group'>
                    <input value={filter.title} onChange={handleTitleFilterChange} type='text' placeholder='Filter by title' />
                </div>
                <button type='button' onClick={handleResetFilters}>Reset Filters</button>
            </div>
        </div>
    )
}

export default Filter