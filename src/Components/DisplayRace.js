import React from "react";
import { useSelector } from "react-redux";

const DisplayRace = () => {
    const race = useSelector((state)=>state.race);
    if (race[0] !== undefined) {
    return(
        <div id='displayRace'>
            <h1>You chose: {race[1]} {race[0]}</h1>
        </div>
    )
}
}
export default DisplayRace