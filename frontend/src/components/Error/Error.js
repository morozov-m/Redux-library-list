import { useEffect } from 'react';
import { clearError, selectError } from '../../redux/slices/errorSlice';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';

function Error() {
    const error = useSelector(selectError)
    const dispatch = useDispatch()

    useEffect(() => {
        if (error) {
            toast.warn(error)
            dispatch(clearError())
        }
    }, [error, dispatch])

    return (
        < ToastContainer position='top-right' autoClose={2000} />
    )
}

export default Error