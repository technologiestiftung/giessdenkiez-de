export function createCSSGradient(colors: string[], degrees = 90): string {
  let gradient = `linear-gradient(${degrees}deg, `;
  const len = colors.length;
  let i = 0;
  for (const color of colors) {
    gradient += color;
    if (i !== len - 1) {
      gradient += ', ';
    }
    i++;
  }
  gradient += ')';
  return gradient;
}
