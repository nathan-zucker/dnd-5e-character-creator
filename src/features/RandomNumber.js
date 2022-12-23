import { useDispatch } from 'react-redux'

const randomizeAction = () => {
    return ({
        type: 'randomNumber',
        randomNumber: Math.floor(Math.random()*100)
    })
}

const increase = (value) => {
    return ({
        type: 'increase',
        payload: value
    })
}

const decrease = (value) => {
    return ({
        type: 'decrease',
        payload: value
    })
}

export function RandomNumber() {
    const dispatch = useDispatch();
    return (
        <div>
            <button onClick={() => dispatch(randomizeAction())}>
                Get a number
            </button>
            <button onClick={() => dispatch(increase(5))}>
                Increase by 5
            </button>
            <button onClick={() => dispatch(decrease(2))}>
                Decrease by 2
            </button>
        </div>
    )
}