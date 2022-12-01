const data = await Deno.readTextFile('input.txt')

const entries = data.split('\n')

type TotalCalories = number

const elves = new Map<number, TotalCalories>()
let elvIndex = 0
entries.forEach((entry) => {
    if (entry === '') {
        elvIndex++
        return
    }
    elves.set(elvIndex, (elves.get(elvIndex) || 0) + Number(entry))
})

let bestThreeScores = [0, 0, 0]
elves.forEach((totalCalories) => {
    const indexToInclude = bestThreeScores.findIndex((val) => val < totalCalories)
    if (indexToInclude !== -1) {
        bestThreeScores = [
            ...bestThreeScores.slice(0, indexToInclude),
            totalCalories,
            ...bestThreeScores.slice(indexToInclude, 2),
        ]
    }
})

console.log(bestThreeScores.reduce((acc, val) => acc + val))
