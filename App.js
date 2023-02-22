import React from "react"
import Die from "./Die"
import Confetti from 'react-confetti'

export default function App() {
    
    const [dice,setDice] = React.useState(allNewDice())
    const [tenzies,setTenzies] = React.useState(false)
    
    React.useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)
        
        if(allSameValue && allHeld){
            setTenzies(true)
        }
        
    },[dice])
    
    
    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false
        }
    }
    
    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push(generateNewDie())
        }
        return newDice
    }
    
    function rollDice() {
        if(!tenzies){
            setDice(oldDice => oldDice.map(die => {
                return die.isHeld ? 
                    die :
                    generateNewDie()
            }))
        }else{
            setTenzies(false)
            setDice(allNewDice())
        }
    }
    
    function holdDice(id){
        setDice(oldDice => oldDice.map((die,dieIndex) => { 
            return dieIndex === id ? {...die, isHeld: !die.isHeld} : die 
        }))
    }
    
    const dieElements = dice.map((die,arrIndex) => 
        <Die 
            key={arrIndex}
            value={die.value}
            isHeld={die.isHeld}
            holdDice={() => holdDice(arrIndex)}
        />) 
    return (
        <main>
            {tenzies && <Confetti width={window.innerWidth} height={window.innerHeight}/>}
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className="dice-container">
                {dieElements}
            </div>
            <button  className="roll-dice " onClick={rollDice}>
                {tenzies ? "New Game": "Roll"}
            </button>
        </main>
    )
}
