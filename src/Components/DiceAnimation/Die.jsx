import React from "react";
import "./Die.css";

/*
 *  The Die component takes in 2 parameters:
 *      - (required) Number called "number"
 *      - (required) String called "color"
 *      - (required) String called "animationClass"
 *      - (required) String called "speedClass"
 */
function Die(props) {
  const dieStyle = `die-list ${props.animationClass} ${props.speedClass}`;
  const dieColor = props.color;

  return (
    <div>
      <ol className={dieStyle} data-roll={props.number} id="die">
        <li
          className="die-item"
          data-side="1"
          style={{ backgroundColor: dieColor }}
        >
          <span className="dot"></span>
        </li>
        <li
          className="die-item"
          data-side="2"
          style={{ backgroundColor: dieColor }}
        >
          <span className="dot"></span>
          <span className="dot"></span>
        </li>
        <li
          className="die-item"
          data-side="3"
          style={{ backgroundColor: dieColor }}
        >
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </li>
        <li
          className="die-item"
          data-side="4"
          style={{ backgroundColor: dieColor }}
        >
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </li>
        <li
          className="die-item"
          data-side="5"
          style={{ backgroundColor: dieColor }}
        >
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </li>
        <li
          className="die-item"
          data-side="6"
          style={{ backgroundColor: dieColor }}
        >
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </li>
      </ol>
    </div>
  );
}

export default Die;
