const data = await Deno.readTextFile('input.txt')

const entries = data.split('\n')

type Inventory = string[]

const elves = new Map<number, Inventory>()
let elvIndex = 0
entries.forEach((entry) => {
    if (entry === '') {
        elvIndex++
        return
    }
    elves.set(elvIndex, [...(elves.get(elvIndex) || []), entry])
})

let bestScore = 0
elves.forEach((inventory) => {

    const total = inventory.reduce((prev, curr) => prev + Number(curr), 0)
    bestScore = total > bestScore ? total : bestScore
})

console.log(bestScore)
