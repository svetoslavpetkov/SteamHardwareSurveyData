import { IValueItem } from "../model";

export type CalculatorFunc = <T extends IValueItem>(items: Array<T>, avgItemsCount: number) => Array<T>