import { expect, describe, it } from "vitest";

import { blendColorDifferenceMode } from "./colorBlender";

describe("blendColorDifferenceMode", () => {
  it("should return default color when has invalid colors", () => {
    const result2 = blendColorDifferenceMode("123", "AVX");
    expect(result2).toBe("#000000");
  });
  it("should blend colors correctly", () => {
    const result1 = blendColorDifferenceMode("#FF0000", "#00FF00");
    expect(result1).toBe("#FFFF00");

    const result2 = blendColorDifferenceMode("#000000", "#FFFFFF");
    expect(result2).toBe("#FFFFFF");

    const result3 = blendColorDifferenceMode("#FFFFFF", "#000000");
    expect(result3).toBe("#FFFFFF");

    const result4 = blendColorDifferenceMode("#FFFFFF", "#FFFFFF");
    expect(result4).toBe("#000000");
  });
});
