import React from 'react';
import { useSelector } from 'react-redux';

export const DisplayClass = () => {
    const classLevel = useSelector(state=>state.class[0])
    
    return(
        <div>
            {classLevel[1] !== null ? <h1>Level {classLevel[1]} {classLevel[0]}</h1> : null}
        </div>
    )
}