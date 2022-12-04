const data = (await Deno.readTextFile('input.txt')).split('\n')

const pairs = data.map((s) => {
    const ranges = s.split(',')
    return ranges.map((range) => range.split('-').map(Number)) // [[2,6], [3,7]]
})

const isContained = (contained: number[], containing: number[]) =>
    contained[0] >= containing[0] && contained[1] <= containing[1]

const containedPairs = pairs.filter(([one, two]) => isContained(one, two) || isContained(two, one))
console.log(containedPairs.length)
