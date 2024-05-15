// Convert RGB to OKLCH without any external library

type Vector3 = [number, number, number];
export type RGB = { r: number; g: number; b: number };
export type RGBColor = { r: number; g: number; b: number };
export type sRGBLinearColor = { r: number; g: number; b: number };
export type XYZColor = { x: number; y: number; z: number };
type OklabColor = { l: number; a: number; b: number };
type OklchColor = { l: number; c: number; h: number };

export function rgb2srgbLinear(rgb: RGBColor): sRGBLinearColor {
  const linearize = (channel: number): number => {
    channel /= 255;
    if (channel <= 0.04045) {
      return channel / 12.92;
    } else {
      return Math.pow((channel + 0.055) / 1.055, 2.4);
    }
  };

  return {
    r: linearize(rgb.r),
    g: linearize(rgb.g),
    b: linearize(rgb.b),
  };
}

export function rgbLinear2xyz(rgbLinear: sRGBLinearColor): XYZColor {
  const matrix = [
    [0.41239079926595934, 0.357584339383878, 0.1804807884018343],
    [0.21263900587151027, 0.715168678767756, 0.07219231536073371],
    [0.01933081871559182, 0.11919477979462598, 0.9505321522496607],
  ];

  let x =
    rgbLinear.r * matrix[0][0] +
    rgbLinear.g * matrix[0][1] +
    rgbLinear.b * matrix[0][2];
  let y =
    rgbLinear.r * matrix[1][0] +
    rgbLinear.g * matrix[1][1] +
    rgbLinear.b * matrix[1][2];
  let z =
    rgbLinear.r * matrix[2][0] +
    rgbLinear.g * matrix[2][1] +
    rgbLinear.b * matrix[2][2];

  return { x, y, z };
}

const multiplyMatrices = (A: number[], B: Vector3): Vector3 => {
  return [
    A[0] * B[0] + A[1] * B[1] + A[2] * B[2],
    A[3] * B[0] + A[4] * B[1] + A[5] * B[2],
    A[6] * B[0] + A[7] * B[1] + A[8] * B[2],
  ];
};

export const xyz2oklab = (xyz: XYZColor): OklabColor => {
  const vxyz: Vector3 = [xyz.x, xyz.y, xyz.z];
  const LMS = multiplyMatrices(
    [
      0.819022437996703, 0.3619062600528904, -0.1288737815209879,
      0.0329836539323885, 0.9292868615863434, 0.0361446663506424,
      0.0481771893596242, 0.2642395317527308, 0.6335478284694309,
    ],
    vxyz
  );
  const LMSg = LMS.map((val) => Math.cbrt(val)) as Vector3;
  const r = multiplyMatrices(
    [
      0.210454268309314, 0.7936177747023054, -0.0040720430116193,
      1.9779985324311684, -2.4285922420485799, 0.450593709617411,
      0.0259040424655478, 0.7827717124575296, -0.8086757549230774,
    ],
    LMSg
  );
  return {
    l: r[0],
    a: r[1],
    b: r[2],
  };
};

export function oklab2oklch(oklab: OklabColor): OklchColor {
  const { l, a, b } = oklab;
  const c = Math.sqrt(a ** 2 + b ** 2); // Chroma
  let h = Math.atan2(b, a) * (180 / Math.PI); // Hue in degrees
  if (h < 0) {
    h += 360;
  } // Normalize hue to be within 0-360 degrees

  return { l, c, h };
}

function truncateToTwoDecimals(num: number): number {
  return Math.floor(num * 100) / 100;
}

function formatNumber(num: number, digits = 2): string {
  let num2 = truncateToTwoDecimals(num);
  // Check if the number is an integer
  if (num2 % 1 === 0) {
    return num2.toString();
  } else {
    return num.toFixed(digits);
  }
}

const rgb2oklch = (rgb: RGB): OklchColor => {
  const rgbLinear = rgb2srgbLinear(rgb);
  const xyz = rgbLinear2xyz(rgbLinear);
  const oklab = xyz2oklab(xyz);
  const oklch = oklab2oklch(oklab);

  return oklch;
};

// RGB is Normalized Format (0-1) using in Figma and particularly in graphics programming.

export function colorToOKLCH(color: RGB, opacity: number = 1): string {
  // Clamp RGB values
  const clampedColor: RGB = {
    r: Math.min(Math.max(color.r, 0), 1),
    g: Math.min(Math.max(color.g, 0), 1),
    b: Math.min(Math.max(color.b, 0), 1),
  };

  // Clamp opacity value
  const clampedOpacity = Math.min(Math.max(opacity, 0), 1);

  let color255 = {
    r: clampedColor.r * 255,
    g: clampedColor.g * 255,
    b: clampedColor.b * 255,
  };

  let oklchColor = rgb2oklch({ r: color255.r, g: color255.g, b: color255.b });

  if (oklchColor) {
    let cl = formatNumber(oklchColor.l * 100, 1);
    let cc = formatNumber(oklchColor.c, 3);
    let chue = '0';

    if (oklchColor.h !== undefined && !Number.isNaN(oklchColor.h)) {
      chue = formatNumber(oklchColor.h, 1);
    }

    if (clampedOpacity === undefined || clampedOpacity === 1) {
      return `oklch(${cl}%, ${cc}, ${chue})`;
    } else {
      return `oklch(${cl}%, ${cc}, ${chue} / ${clampedOpacity * 100}%)`;
    }
  } else {
    return 'oklch(0%, 0, 0)';
  }
}
