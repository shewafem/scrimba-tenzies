import Die from "./components/Die.jsx"
import React from 'react'
import { nanoid } from "nanoid"
import Confetti from 'react-confetti'

export default function App() {

    const [dice, setDice] = React.useState(() => generateAllNewDice())

    const gameWon = dice.every(die => die.isHeld && die.value === dice[0].value)

    const buttonRef = React.useRef(null)

    React.useEffect(() => {
        if (gameWon) {
            buttonRef.current.focus()
        }
    }, [gameWon])

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
        if (!gameWon) {
            setDice(oldDice =>
                oldDice.map(die =>
                    die.isHeld ? die : {
                        ...die,
                        value: Math.ceil(Math.random() * 6),
                }
            ))
        } else {
            setDice(generateAllNewDice)
        }
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
            {gameWon && <Confetti />}
            <div aria-live="polite" className="sr-only">
                {gameWon && <p>Congratulations! You won! Press &quot;New Game&quot; to start again.</p>}
            </div>
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className="dice-container">
                {diceElements}
            </div>
            <button ref={buttonRef} className="roll-dice" onClick={rollDice}>
                {gameWon ? "New Game" : "Roll Dice"}
            </button>
        </main>
    )
}