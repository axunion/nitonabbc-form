export interface InputTextProps {
  label: string;
  name: string;
  maxlength: string;
  title: string;
  pattern: string;
  required: boolean;
}

export interface InputRadioProps {
  name: string;
  items: { label: string; value: string }[];
}
