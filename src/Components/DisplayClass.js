import React from 'react';
import { useSelector } from 'react-redux';

export const DisplayClass = () => {
    const classLevel = useSelector(state=>state.class[0])
    const progress = useSelector(state=>state.progress)
    
    return(
        <div id="display-class-level">
            {progress.includes("classLevel") ? <h1>Level {classLevel[1]} {classLevel[0]}</h1> : null}
        </div>
    )
}