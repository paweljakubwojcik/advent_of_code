const data = await Deno.readTextFile('input.txt')
const dataRows = data.split('\n')

const groups = dataRows.reduce<string[][]>(
    (acc, entry) => {
        if (acc?.at(-1)?.length! >= 3) {
            acc.push([entry])
        } else {
            acc.at(-1)?.push(entry)
        }
        return acc
    },
    [[]]
)

const badges = groups
    .map((group) => {
        return group.reduce((acc, entry) => {
            // finding duplicate chars with regexp
            return entry.match(new RegExp(`[${acc}]`, 'g'))?.join('') || ''
        })
    })
    .map((b) => b.slice(0, 1))

const priorities = badges.map((c) => {
    const charCode = c.charCodeAt(0)
    return charCode > 96 ? charCode - 96 : charCode - (65 - 27)
})
console.log(badges)
console.log(priorities.reduce((sum, el) => sum + el))
