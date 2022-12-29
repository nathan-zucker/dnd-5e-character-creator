import React, { useEffect, useState } from "react";
import Die from "./Die.jsx";

/*
 *   The Dice component takes in 2 parameters:
 *       - (required) Array of 4 numbers called "numbers"
 *       - (optional) Array of 4 colors called "colors"
 */
function Dice(props) {
  let numberArray = props.numbers;
  const [colorArray] = useState(props.colors ?? [
    getRandomColor(),
    getRandomColor(),
    getRandomColor(),
    getRandomColor(),
  ]);
  const [animationToggle, setAnimationToggle] = useState(false);

  // flip animationToggle when props.numbers changes
  // this will cause the dice to fully roll vs gently rotate to the new number
  useEffect(() => {
    setAnimationToggle((toggle) => !toggle);
  }, [props.numbers]);

  function getRandomColor() {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return "#" + randomColor;
  }

  function getAnimation(toggle) {
    return toggle ? "roll-animation-1" : "roll-animation-2";
  }

  return (
    <div className="dice">
      <Die
        animationClass={getAnimation(animationToggle)}
        speedClass="roll-animation-speed-1"
        color={colorArray[0]}
        number={numberArray[0]}
      />
      <Die
        animationClass={getAnimation(!animationToggle)}
        speedClass="roll-animation-speed-2"
        color={colorArray[1]}
        number={numberArray[1]}
      />
      <Die
        animationClass={getAnimation(animationToggle)}
        speedClass="roll-animation-speed-3"
        color={colorArray[2]}
        number={numberArray[2]}
      />
      <Die
        animationClass={getAnimation(!animationToggle)}
        speedClass="roll-animation-speed-4"
        color={colorArray[3]}
        number={numberArray[3]}
      />
    </div>
  );
}

export default Dice;
