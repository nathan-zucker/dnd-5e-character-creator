import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import './DisplayFinalStats.css'

export default function DisplayFinalStats () {
    return (
        <div id="display-final-stats">
            <h1>final stats</h1>
            <div id="stat-box">
                <h3>STRENGTH</h3>
                <h1>MOD</h1>
                <h4 id="base-score">score</h4>
            </div>
            <div id="stat-box">
                <h3>DEXTERITY</h3>
                <h1>MOD</h1>
                <h4 id="base-score">score</h4>
            </div>
            <div id="stat-box">
                <h3>CONSTITUTION</h3>
                <h1>MOD</h1>
                <h4 id="base-score">score</h4>
            </div>
            <div id="stat-box">
                <h3>INTELLIGENCE</h3>
                <h1>MOD</h1>
                <h4 id="base-score">score</h4>
            </div>
            <div id="stat-box">
                <h3>WISDOM</h3>
                <h1>MOD</h1>
                <h4 id="base-score">score</h4>
            </div>
            <div id="stat-box">
                <h3>CHARISMA</h3>
                <h1>MOD</h1>
                <h4 id="base-score">score</h4>
            </div>
        </div>
    )
}