export interface ColorItem {
  label: string;
  value: string;
}

export interface ColorResponseDTO {
  items: {
    name: string;
    rgb: string;
  }[];
}

export interface Route {
  default?: boolean;
  id: string;
  title: string;
  component: JSX.Element;
}
