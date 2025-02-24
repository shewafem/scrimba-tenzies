import Die from "./components/Die.jsx"
import React from 'react'
import { nanoid } from "nanoid"

export default function App() {
    
    const [dice, setDice] = React.useState(generateAllNewDice())

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
        setDice(generateAllNewDice())
    }

    const diceElements = dice.map(dieObj => <Die key={dieObj.id} value={dieObj.value}/>)
    
    return (
        <main>
            <div className="dice-container">
                {diceElements}
            </div>
            <button className="roll-dice" onClick={rollDice}>
                Roll Dice
            </button>
        </main>
    )
}