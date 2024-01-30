import { ColorItem } from "../types";
import ColorService from "./colorService";

class ColorServiceAdapter {
  colorService: typeof ColorService;

  constructor(colorService: typeof ColorService) {
    this.colorService = colorService;
  }

  async get(query: string) {
    const data = await this.colorService.get(query);
    const formattedColors: ColorItem[] = data?.items?.map((item) => ({
      label: item.name,
      value: `#${item.rgb}`,
    }));

    return formattedColors;
  }
}

export default new ColorServiceAdapter(ColorService);
