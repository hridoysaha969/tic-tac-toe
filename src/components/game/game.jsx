import React from "react";
import Board from "../board/board";
import classes from './game.module.css';

function calculateWinner(squeres) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]

    for(let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i]
        if(squeres[a] && squeres[a] === squeres[b] && squeres[a] === squeres[c]) {
            return squeres[a]
        }
    }

    return null
}

class Game extends React.Component {
    state = {
        history: [{squeres: Array(9).fill(null)}],
        stepNumber: 0,
        xIsNext: true
    }

    handleClick = i => {
        const history = this.state.history.slice(0, this.state.stepNumber + 1)
        const current = history[history.length - 1]
        const squeres = current.squeres.slice()

        if(calculateWinner(squeres) || squeres[i]) {
            return
        }

        squeres[i] = this.state.xIsNext ? 'X' : 'O'

        this.setState({
            history: history.concat([{squeres}]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext
        })
    }

    jumpTo = step => {
        this.setState({
            stepNumber: step,
            xIsNext: step % 2 === 0
        })
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squeres);
        
        const moves = history.map((step, move) => {
            const desc = move ? 'Go to move #' + move : 'Restart Game'

            return (
                <li className={classes.moveLists} key={move}>
                    <button className={move ? classes.moves : classes.moveBg} onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            )
        })

        let status = ''
        if(winner) {
            status = 'Winner is ' + winner
        } else {
            
            for(let i = 0; i < current.squeres.length; i++) {
                if(current.squeres[i] != null) {
                    status = 'Match Draw'
                } else {
                    status = 'Next turn for ' + (this.state.xIsNext ? `'X'` : `'O'`)
                }
            }
        }

        return (
            <div className="game">
                <div className={classes.gameBord}>
                    <div className={classes.gameTitleBox}>
                        <h2 className={classes.gameTitle}>Tic Tac Toe</h2>
                        <span className={classes.gameSubtitle}>By <a target="_blank" href="https://www.facebook.com/hridoysaha143">Hridoy Saha</a></span>
                    </div>
                    <Board onClick={this.handleClick} squeres={current.squeres} />
                </div>
                <div className="game-info">
                    <div className={classes.status}>{status}</div>
                    <ol>
                        {moves}
                    </ol>
                </div>
            </div>
        )
    }
}

export default Game;