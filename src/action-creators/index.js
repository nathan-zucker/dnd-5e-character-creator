export const increaseNumber = (amount) => {
    return (dispatch) => {
        dispatch({
            type: 'increase',
            payload: amount,
        })
    }
}

export const decreaseNumber = (amount) => {
    return (dispatch) => {
        dispatch({
            type: 'decrease',
            payload: amount,
        })
    }
}

