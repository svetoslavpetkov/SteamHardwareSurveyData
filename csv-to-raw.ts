import fs from "fs"
import { constants } from "./const"
import { IRawData } from "./model"

const tryGetYear = (lineItems: Array<string>): number | undefined => {
  const firstItem = lineItems[0].trim()
  const result = parseInt(firstItem)
  if(isNaN(result)) {
    return undefined
  }

  return 2000 < result && result < 2050 ? result : undefined
}
console.log('Starting directory: ' + process.cwd());
var data = fs.readFileSync(constants.csvInputFilePath, 'utf-8')
console.log(`File data loaded from ${constants.csvInputFilePath}`)
const lines = data.split("\n")

const result: Array<IRawData> = []
let currentYear = 0;
for (let index = 0; index < lines.length; index++) {
  const line = lines[index];
  const lineItems = line.split(",")
  const newYear = tryGetYear(lineItems);
  if(newYear) {
    currentYear = newYear
    continue
  }
  
  const cores = parseInt(lineItems[0].replace("cpu", "").trim())
  //cycle through the months
  for (let j = 1; j < lineItems.length && j < 13; j++) {
    const lineElement = lineItems[j].trim()
    const possibleValue = parseFloat(lineElement)
    if (!isNaN(possibleValue)) {      
      result.push({
        cores,
        value: possibleValue,  
        year: currentYear,
        month: j
      })
    }
  }
}
const resultString = JSON.stringify(result, null, 2)
fs.writeFileSync(constants.rawFilePath, resultString)
console.log(`REsult written to ${constants.rawFilePath}`)