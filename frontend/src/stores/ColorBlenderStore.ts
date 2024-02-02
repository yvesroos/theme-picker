import { makeAutoObservable, runInAction } from "mobx";
import colorServiceAdapter from "../services/colorServiceAdapter";
import { ColorItem } from "../types";
import { blendColorDifferenceMode } from "../utils/colorBlender";

export class ColorBlenderStore {
  colors: ColorItem[] = [];
  selectedColors: ColorItem[] = [];
  constructor() {
    makeAutoObservable(this);
  }

  get colorBlended() {
    if (this.selectedColors.length === 2) {
      return blendColorDifferenceMode(
        this.selectedColors[0].value,
        this.selectedColors[1].value
      );
    }
  }

  setSelectedColor(index: number, color: ColorItem) {
    this.selectedColors[index] = color;
  }

  resetColors() {
    this.colors = [];
  }

  getColorsByName = (query: string | undefined) => {
    if (query?.length) {
      colorServiceAdapter.get(query).then((colors) => {
        runInAction(() => {
          this.colors = colors;
        });
      });
    }
  };
}

const colorBlendStore = new ColorBlenderStore();
export default colorBlendStore;
