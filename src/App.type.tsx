export interface Settings {
  occupied: number;
  powerSave: number;
  minimum: number;
}

export type onChangeKey = "minimum" | "powerSave" | "occupied";
