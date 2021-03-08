import { IQuarterItem, IRawData, IValueItem } from "../model";
import { CalculatorFunc } from "./calculator";

class Quarter {
  items: Array<IRawData> = []
  constructor(readonly year: number, readonly quarter: number) {}

  static from(input: {year: number, month: number}) {
    const quarter = Math.ceil(input.month / 3)
    return new Quarter(input.year, quarter)
  }

  next() : Quarter {
    if (this.quarter === 4) {
      return new Quarter(this.year +1, 1)
    }
    return new Quarter(this.year, this.quarter + 1)
  }

  equals(other: Quarter) {
    return (this.year === other.year && this.quarter === other.quarter)
  }

  isLessThan(other: Quarter): boolean {
    if (this.year < other.year) {
      return true
    } else if (this.year === other.year && this.quarter < other.quarter) {
      return true
    }
    return false
  }  

  isBiggerThan(other: Quarter): boolean {
    return !this.isLessThan(other) && !this.equals(other)
  }

  calc(precision: number = 4): number {
    const rawResult = this.items.reduce((sum, item) => sum + item.value, 0) / this.items.length
    return parseFloat(rawResult.toFixed(precision))
  }
}

export const getQuarterData = (items: Array<IRawData>) => {
  const result: Array<IQuarterItem> = []  

  //get all unique cores
  const cores: Array<number> = items
    .map(i => i.cores)
    .reduce((all, core) => { 
      return all.includes(core) ? all : [...all, core]
    }, new Array<number>())
  
  cores.forEach(core => {
    const coreItems = items.filter(i => i.cores === core)
    const coreQuarters: Array<Quarter> = []
    for (let index = 0; index < coreItems.length; index++) {
      const item = coreItems[index];
      const itemQuarter = Quarter.from(item)
      const existingQuarter = coreQuarters.find(q => q.equals(itemQuarter))
      if (existingQuarter) {
        existingQuarter.items.push(item)
      } else {
        itemQuarter.items.push(item)
        coreQuarters.push(itemQuarter)
      }
    }

    coreQuarters.sort((q1, q2) => q1.isLessThan(q2) 
      ? -1 
      : q1.equals(q2) ? 0 : 1)
    //fill the result
    for (let qIdx = 0; qIdx < coreQuarters.length; qIdx++) {
      const coreQuarter = coreQuarters[qIdx];
      const prevQuarter = qIdx === 0 ? coreQuarter : coreQuarters[qIdx-1];
      const value = coreQuarter.calc()
      const prevValue = prevQuarter.calc()
      const changeSincePrevQuarter =  parseFloat((value - prevValue).toFixed(4))
      result.push({
        cores: core,
        quarter: coreQuarter.quarter,
        year: coreQuarter.year,
        value,
        changeSincePrevQuarter
      })
    }
  })
  
  return result;
}