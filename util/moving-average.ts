import { IValueItem } from "../model";
import { CalculatorFunc } from "./calculator";

export const movingAverage: CalculatorFunc = <T extends IValueItem>(items: Array<T>, avgItemsCount: number) => {
  const result: Array<T> = [];
  const buffer: Array<number> = [];

  for (let index = 0; index < items.length; index++) {
    const element = items[index];
    if (buffer.length == avgItemsCount) {
      buffer.shift()
    }
    buffer.push(element.value)

    const avg = buffer.reduce((sum, val) => sum + val, 0) / buffer.length

    result.push({
      ...element,
      value: avg
    })
  }

  return result;
}