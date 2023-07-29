export interface LuminaireSettingsProps {
  settingsEmitter: (settings: Settings) => void;
}

export interface Settings {
  occupied: number;
  powerSave: number;
  minimum: number;
}

export type onChangeKey = "minimum" | "powerSave" | "occupied";
