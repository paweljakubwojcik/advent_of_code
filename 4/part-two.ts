const data = (await Deno.readTextFile('input.txt')).split('\n')

const pairs = data.map((s) => {
    const ranges = s.split(',')
    return ranges.map((range) => range.split('-').map(Number)) // [[2,6], [3,7]]
})

const isInRange = (num: number, [start, end]: number[]) => num >= start && num <= end

const isOverlapping = (first: number[], second: number[]) =>
    first.some((e) => isInRange(e, second)) || second.some((e) => isInRange(e, first))

const overlapped = pairs.filter(([one, two]) => isOverlapping(one, two))
console.log(overlapped.length)
