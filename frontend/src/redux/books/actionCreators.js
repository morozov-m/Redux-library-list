import * as actionTypes from "./actionTypes";

export function addBook(newBook) {
    return {
        type: actionTypes.ADD_BOOK,
        payload: newBook
    }
}