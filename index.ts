import rawData from "./data/raw.json"
import { getQuarterData } from "./util/quarter-calcualtor"

console.log('Hello typescript !')

const quarterData = getQuarterData(rawData)

quarterData.forEach(d => console.log(`cpu ${d.cores} ${d.year}.Q${d.quarter} = ${d.value}    change:${d.changeSincePrevQuarter}`))
console.log('Hello typescript !')
