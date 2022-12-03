const data = await Deno.readTextFile('input.txt')

type MyMove = 'X' | 'Y' | 'Z'
type OpponentMove = 'A' | 'B' | 'C'
type Move = 'Rock' | 'Paper' | 'Scissor'

const moveMap: Record<OpponentMove, Move> = {
    A: 'Rock',
    B: 'Paper',
    C: 'Scissor',
}

const relationMap = new Map<Move, { loseWith: Move; winWith: Move }>([
    ['Paper', { winWith: 'Rock', loseWith: 'Scissor' }],
    ['Rock', { winWith: 'Scissor', loseWith: 'Paper' }],
    ['Scissor', { winWith: 'Paper', loseWith: 'Rock' }],
])

const scoreFromShape: Record<Move, number> = {
    Rock: 1,
    Paper: 2,
    Scissor: 3,
}

const endingScore = {
    X: 0,
    Y: 3,
    Z: 6,
}

const rows: string[] = data.split('\n')
const scores = rows
    .filter((s) => s.match(/[ABC] [XYZ]/))
    .map((row) => {
        const [opponentMoveLetter, ending] = row.split(' ') as [OpponentMove, MyMove]
        const opponentMove = moveMap[opponentMoveLetter]

        const myMove = (() => {
            if (ending === 'X') {
                return relationMap.get(opponentMove)?.winWith
            }
            if (ending === 'Y') {
                return opponentMove
            }
            if (ending === 'Z') {
                return relationMap.get(opponentMove)?.loseWith
            }
            throw new Error('Wait a minute, wrong move code')
        })()
        return endingScore[ending] + scoreFromShape[myMove!]
    })

const sumScore = scores.reduce((sum, el) => sum + el)
console.log(sumScore)
console.log(scores)
