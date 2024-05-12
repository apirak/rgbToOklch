import { converter } from 'culori';

export type RGB = {
  r: number;
  g: number;
  b: number;
};

function truncateToTwoDecimals(num: number): number {
  return Math.floor(num * 100) / 100;
}

function formatNumber(num: number, digits = 2): string {
  let num2 = truncateToTwoDecimals(num);
  // Check if the number is an integer
  if (num2 % 1 === 0) {
    return num2.toString(); // Convert the whole number to a string
  } else {
    return num.toFixed(digits); // Format the number to two decimal places and it's already a string
  }
}

export function colorToOKLCH(color: RGB, opacity: number = 1): string {
  let oklch = converter('oklch');
  let color255 = {
    r: color.r * 255,
    g: color.g * 255,
    b: color.b * 255,
  };
  let oklchColor = oklch(`rgb(${color255.r}, ${color255.g}, ${color255.b})`);

  if (oklchColor) {
    let cl = formatNumber(oklchColor.l * 100, 1);
    let cc = formatNumber(oklchColor.c, 3);
    let chue = '0';

    if (oklchColor.h !== undefined && !Number.isNaN(oklchColor.h)) {
      chue = formatNumber(oklchColor.h, 1);
    }

    if (opacity === undefined || opacity === 1) {
      return `oklch(${cl}%, ${cc}, ${chue})`;
    } else {
      return `oklch(${cl}%, ${cc}, ${chue} / ${opacity * 100}%)`;
    }
  } else {
    return 'oklch(0%, 0, 0)';
  }
}
