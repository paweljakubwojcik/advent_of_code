const data = await Deno.readTextFile('input.txt')

type Compartment = string

type Rucksack = [Compartment, Compartment]

const rucksacks: Rucksack[] = data
    .split('\n')
    .map((str) => [str.slice(0, str.length / 2), str.slice(str.length / 2, str.length)])

const duplicateTypes = rucksacks.map(([first, second]) => {
    const [duplicateChar] = first.match(new RegExp(`[${second}]`)) || []
    return duplicateChar
})

const priorities = duplicateTypes.map((c) => {
    const charCode = c.charCodeAt(0)
    return charCode > 96 ? charCode - 96 : charCode - (65 - 27)
})

console.log(priorities.reduce((sum, el) => sum + el))
