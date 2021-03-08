import { IValueItem } from "../model"
import { movingAverage } from "./moving-average"

interface ICustomValueItem extends IValueItem {
  originalValue: number
}

describe("movingAverage", () => {
  it("should calculate correct and preserve other data", () => {
    const input: Array<ICustomValueItem> =  [1, 2, 3, 4, 5].map(n => ({ value:n, originalValue: n }))
    const expectedResult : Array<ICustomValueItem>  = [1, 1.5, 2, 3, 4].map((val, index) => ({value: val, originalValue: index + 1 }))
    const result = movingAverage(input, 3)
    expect(result).toEqual(expectedResult)
  })



  it("should round to the 4th digit", () => {
    const input: Array<ICustomValueItem> =  [1, 3, 4].map(n => ({ value:n, originalValue: n }))
    const expectedResult = [1, 2, 2.6667]
    const result = movingAverage(input, 3).map(i => i.value)
    expect(result).toEqual(expectedResult)
  })
})