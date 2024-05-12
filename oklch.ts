type Vector3 = [number, number, number];
export type RGB = {
  r: number;
  g: number;
  b: number;
};

export type RGBColor = {
  r: number;
  g: number;
  b: number;
};

export type sRGBLinearColor = {
  r: number;
  g: number;
  b: number;
};

export type XYZColor = {
  x: number;
  y: number;
  z: number;
};

// const rgb2srgbLinear = (rgb: Vector3): Vector3 =>
//   rgb.map((c) =>
//     Math.abs(c) <= 0.04045
//       ? c / 12.92
//       : Math.sign(c) * ((Math.abs(c) + 0.055) / 1.055) ** 2.4
//   ) as Vector3;

// const rgb2srgbLinear = (rgb: Vector3): Vector3 =>
//   rgb.map((c) =>
//     Math.abs(c) <= 0.04045
//       ? c / 12.92
//       : (c < 0 ? -1 : 1) * ((Math.abs(c) + 0.055) / 1.055) ** 2.4
//   ) as Vector3;

export function rgb2srgbLinear(rgb: RGBColor): sRGBLinearColor {
  const linearize = (channel: number): number => {
    if (channel <= 0.04045) {
      return channel / 12.92;
    } else {
      return ((channel + 0.055) / 1.055) ** 2.4;
    }
  };

  return {
    r: linearize(rgb.r),
    g: linearize(rgb.g),
    b: linearize(rgb.b),
  };
}

// const multiplyMatrices = (A: number[], B: Vector3): Vector3 => {
//   return [
//     A[0] * B[0] + A[1] * B[1] + A[2] * B[2],
//     A[3] * B[0] + A[4] * B[1] + A[5] * B[2],
//     A[6] * B[0] + A[7] * B[1] + A[8] * B[2],
//   ];
// };

// const rgbLinear2xyz = (rgb: Vector3): Vector3 => {
//   return multiplyMatrices(
//     [
//       0.41239079926595934, 0.357584339383878, 0.1804807884018343,
//       0.21263900587151027, 0.715168678767756, 0.07219231536073371,
//       0.01933081871559182, 0.11919477979462598, 0.9505321522496607,
//     ],
//     rgb
//   );
// };

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

const oklab2oklch = ([l, a, b]: Vector3): Vector3 => [
  l,
  Math.sqrt(a ** 2 + b ** 2),
  Math.abs(a) < 0.0002 && Math.abs(b) < 0.0002
    ? NaN
    : ((((Math.atan2(b, a) * 180) / Math.PI) % 360) + 360) % 360,
];

const xyz2oklab = (xyz: Vector3): Vector3 => {
  const LMS = multiplyMatrices(
    [
      0.819022437996703, 0.3619062600528904, -0.1288737815209879,
      0.0329836539323885, 0.9292868615863434, 0.0361446663506424,
      0.0481771893596242, 0.2642395317527308, 0.6335478284694309,
    ],
    xyz
  );
  const LMSg = LMS.map((val) => Math.cbrt(val)) as Vector3;
  return multiplyMatrices(
    [
      0.210454268309314, 0.7936177747023054, -0.0040720430116193,
      1.9779985324311684, -2.4285922420485799, 0.450593709617411,
      0.0259040424655478, 0.7827717124575296, -0.8086757549230774,
    ],
    LMSg
  );
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

const rgb2oklch = (rgb: Vector3): Vector3 => {
  const rgbLinear = rgb2srgbLinear(rgb);
  const xyz = rgbLinear2xyz(rgbLinear);
  const oklab = xyz2oklab(xyz);
  const oklch = oklab2oklch(oklab);

  return oklch;
};

export function colorToOKLCH(color: RGB, opacity: number = 1): string {
  // let oklch = converter('oklch');
  let color255 = {
    r: color.r * 255,
    g: color.g * 255,
    b: color.b * 255,
  };
  let oklch = rgb2oklch([color255.r, color255.g, color255.b]);
  console.log('oklch', oklch);
  let oklchColor = { l: oklch[0], c: oklch[1], h: oklch[2] };
  console.log('oklchColor', oklchColor);

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

// reference https://gist.github.com/dkaraush/65d19d61396f5f3cd8ba7d1b4b3c9432
