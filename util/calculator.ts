import { IValueItem } from "../model";

export type CalculatorFunc = <T extends IValueItem, G extends IValueItem>(items: Array<T>, avgItemsCount: number) => Array<G>