export interface IValueItem {
  value: number
}

export interface IValueItemForCores extends IValueItem {
  cores: number
}

export interface IRawData extends IValueItemForCores {
  year: number
  month: number
}
