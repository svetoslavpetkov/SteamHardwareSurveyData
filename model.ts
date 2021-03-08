export interface IValueItem {
  cores: number
  value: number
}

export interface IRawData extends IValueItem {
  year: number
  month: number
}
