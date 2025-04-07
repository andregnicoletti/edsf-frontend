const colors = [
  "#FF5733", // Vibrant Orange
  "#33FF57", // Fresh Green
  "#3357FF", // Bright Blue
  "#FF33A1", // Hot Pink
  "#33FFF0", // Aqua
  "#FFC133", // Warm Yellow
  "#8D33FF", // Purple
  "#33FF8D", // Mint Green
  "#FF3357", // Coral Red
  "#33A1FF", // Sky Blue
  "#FF9633", // Tangerine
  "#4D33FF", // Indigo
  "#33FFC1", // Teal
  "#A133FF", // Violet
  "#57FF33", // Lime
  "#FF5733", // Fiery Red
  "#338DFF", // Deep Sky Blue
  "#FF33C1", // Magenta
  "#33FF4D", // Bright Mint
  "#C133FF", // Electric Purple
  "#5733FF", // Cobalt Blue
  "#FF33FF", // Neon Pink
  "#33FFB8", // Seafoam
  "#FFC133", // Sunshine Yellow
  "#FF338D", // Raspberry
  "#33FFC1", // Soft Teal
  "#FF8D33", // Sunset Orange
  "#338DFF", // Cerulean
  "#C1FF33", // Chartreuse
  "#FF33A1", // Fuchsia
];

export function getRandomColors(size: number) {
  const responseColors = colors;

  const timesBiggerThan = size / colors.length;
  if (timesBiggerThan > 1) {
    const times = Math.ceil(timesBiggerThan);
    for (let i = 0; i < times; i++) {
      responseColors.push(...colors);
    }
  }

  return colors;
}
