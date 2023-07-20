export interface SettingProps {
  id: string;
  heading: string;
  value: number;
  handleChange: (value: number) => void;
}

export interface MarkItem {
  value: number;
  label: string;
}
