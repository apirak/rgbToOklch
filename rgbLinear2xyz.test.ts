import { rgbLinear2xyz, sRGBLinearColor, XYZColor } from './oklch';

describe('convert RGB to OKLCH', () => {
  // Existing tests for rgb2srgbLinear...

  it('convert sRGB linear red color to XYZ', () => {
    const rgbLinear: sRGBLinearColor = { r: 1, g: 0, b: 0 }; // Red color in sRGB Linear
    const result: XYZColor = rgbLinear2xyz(rgbLinear);
    expect(result.x).toBeCloseTo(0.41239079926595934, 4); // Calculated from the matrix multiplication
    expect(result.y).toBeCloseTo(0.21263900587151027, 4);
    expect(result.z).toBeCloseTo(0.01933081871559182, 4);
  });

  it('convert sRGB linear black color to XYZ', () => {
    const rgbLinear: sRGBLinearColor = { r: 0, g: 0, b: 0 }; // Black color in sRGB Linear
    const result: XYZColor = rgbLinear2xyz(rgbLinear);
    expect(result.x).toBeCloseTo(0, 4);
    expect(result.y).toBeCloseTo(0, 4);
    expect(result.z).toBeCloseTo(0, 4);
  });

  it('convert sRGB linear rgba(0, 100, 170) to XYZ', () => {
    const rgbLinear: sRGBLinearColor = {
      r: 0,
      g: 0.12743768043564743,
      b: 0.4019777798322,
    }; // RGB (0, 100, 170) converted to sRGB Linear
    const result: XYZColor = rgbLinear2xyz(rgbLinear);
    expect(result.x).toBeCloseTo(0.11811898539532916373190043859354, 4);
    expect(result.y).toBeCloseTo(0.12015914419204324576718115172908, 4);
    expect(result.z).toBeCloseTo(0.3972827104775062296376240705382314, 4);
  });

  it('convert sRGB linear rgba(100, 110, 160) to XYZ', () => {
    const rgbLinear: sRGBLinearColor = {
      r: 0.127438,
      g: 0.155926,
      b: 0.351533,
    }; // RGB (100, 110, 160) converted to sRGB Linear
    const result: XYZColor = rgbLinear2xyz(rgbLinear);
    expect(result.x).toBeCloseTo(0.17175590736888790438082, 4);
    expect(result.y).toBeCloseTo(0.16398966223149945112169, 4);
    expect(result.z).toBeCloseTo(0.35519246518651441576774, 4);
  });

  it('convert specific sRGB linear color to XYZ', () => {
    const rgbLinear: sRGBLinearColor = { r: 0.539479, g: 0.304987, b: 0.06301 }; // RGB (194, 150, 71) converted to sRGB Linear
    const result: XYZColor = rgbLinear2xyz(rgbLinear);
    expect(result.x).toBeCloseTo(0.34290684539007085761286, 4); // Calculated from the matrix multiplication
    expect(result.y).toBeCloseTo(0.33738026587077791918843, 4);
    expect(result.z).toBeCloseTo(0.10667445996834347393104, 4);
  });
});
