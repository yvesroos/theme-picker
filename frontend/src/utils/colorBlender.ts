const DEFAULT_COLOR = "00";

const parseColor = (color: string): string[] => {
  const hexRegex = /^#([A-F0-9]{2})([A-F0-9]{2})([A-F0-9]{2})$/i;
  const matchedRegex = color.match(hexRegex);
  if (matchedRegex?.length === 4) {
    return [matchedRegex[1], matchedRegex[2], matchedRegex[3]];
  }
  return [DEFAULT_COLOR, DEFAULT_COLOR, DEFAULT_COLOR];
};

const hexDifference = (color1: string, color2: string): string => {
  const hex = Math.abs(parseInt(color1, 16) - parseInt(color2, 16))
    .toString(16)
    .toUpperCase();
  if (hex.length === 1) {
    return `0${hex}`;
  }
  return hex;
};

export const blendColorDifferenceMode = (
  color1: string,
  color2: string
): string => {
  const [red1, green1, blue1] = parseColor(color1);
  const [red2, green2, blue2] = parseColor(color2);
  const red = hexDifference(red1, red2);
  const green = hexDifference(green1, green2);
  const blue = hexDifference(blue1, blue2);
  return `#${red}${green}${blue}`;
};
