const data = (await Deno.readTextFile('input.txt')).split('\n')

const stackData = data.slice(0, 8)
const moves = data.slice(10).map((str) => str.match(/\d{1,2}/g)?.filter(Boolean).map(Number)) as number[][]// [count, from to]

const stackPositions = new Array(9).fill(null).map((_, i) => {
    return data[8].split('').findIndex((str) => str === (i + 1).toString())
})

const stacks = new Map<number, string[]>(stackPositions.map((_, i) => [i + 1, []]))

stackData.reverse().forEach((string) => {
    stackPositions.forEach((pos, index) => {
        const key = index + 1
        const crate = string.charAt(pos)
        if (crate.trim()) {
            stacks.get(key)?.push(crate)
        }
    })
})

const moveCrate = (count: number, from: number, to: number) => {
    const crates = stacks.get(from)?.splice(-count)
    crates && stacks.get(to)?.push(...crates)
}

moves.forEach(([count, from, to]) => {
    moveCrate(count, from, to)
})
console.log(Array.from(stacks.values()).map(stack => stack.at(-1)).join(""))


