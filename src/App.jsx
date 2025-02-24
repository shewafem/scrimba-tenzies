import Die from "./components/Die.jsx"
import React from 'react'
import { nanoid } from "nanoid"

export default function App() {

    const [dice, setDice] = React.useState(generateAllNewDice())

            /**
     * Challenge: Update the `hold` function to flip
     * the `isHeld` property on the object in the array
     * that was clicked, based on the `id` prop passed
     * into the function.
     * 
     * Hint: as usual, there's more than one way to 
     * accomplish this.
     */ 

    //const [isDiceClicked, setIsDiceClicked] = React.useState(false)
    function hold(id) {
        setDice(oldDice => (oldDice.map(die =>
            die.id === id ? {...die, isHeld: !die.isHeld} : die))
        )
    }

    function generateAllNewDice() {
        return new Array(10)
            .fill(0)
            .map(() => ({
                value: Math.ceil(Math.random() * 6),
                isHeld: false,
                id: nanoid(),
            }))
    }

    function rollDice() {
        setDice(oldDice =>
            oldDice.map(die =>
                die.isHeld ? die : {
                    ...die,
                    value: Math.ceil(Math.random() * 6),
            }
        ))
    }

    const diceElements = dice.map(dieObj => (
        <Die 
        hold={() => {hold(dieObj.id)}} 
        isHeld={dieObj.isHeld} 
        key={dieObj.id} 
        value={dieObj.value}
        />)
    )

    return (
        <main>
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className="dice-container">
                {diceElements}
            </div>
            <button className="roll-dice" onClick={rollDice}>
                Roll Dice
            </button>
        </main>
    )
}