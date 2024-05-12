import { rgb2srgbLinear, RGBColor, sRGBLinearColor } from './oklch';

describe('Test rgb2srgbLinear', () => {
  it('convert red color', () => {
    const rgb = { r: 255 / 255, g: 0, b: 0 }; // Red color
    const result: sRGBLinearColor = rgb2srgbLinear(rgb);
    expect(result.r).toBeCloseTo(1, 4);
    expect(result.g).toBeCloseTo(0, 4);
    expect(result.b).toBeCloseTo(0, 4);
  });

  it('convert black color', () => {
    const rgb = { r: 0, g: 0, b: 0 };
    const result: sRGBLinearColor = rgb2srgbLinear(rgb);
    expect(result.r).toBeCloseTo(0, 4);
    expect(result.g).toBeCloseTo(0, 4);
    expect(result.b).toBeCloseTo(0, 4);
  });

  it('convert rgba(0, 100, 170, 0.75)', () => {
    const rgb = { r: 0, g: 100 / 255, b: 170 / 255 }; // Specific color
    const result: sRGBLinearColor = rgb2srgbLinear(rgb);
    expect(result.r).toBeCloseTo(0, 4);
    expect(result.g).toBeCloseTo(0.12743768043564743, 4);
    expect(result.b).toBeCloseTo(0.4019777798322, 4);
  });

  it('convert rgba(100, 110, 160, 0.25)', () => {
    const rgb = { r: 100 / 255, g: 110 / 255, b: 160 / 255 }; // Specific color
    const result: sRGBLinearColor = rgb2srgbLinear(rgb);
    expect(result.r).toBeCloseTo(0.127438, 4);
    expect(result.g).toBeCloseTo(0.155926, 4);
    expect(result.b).toBeCloseTo(0.351533, 4);
  });

  it('convert rgba(194, 150, 71)', () => {
    const rgb = { r: 194 / 255, g: 150 / 255, b: 71 / 255 }; // Specific color
    const result: sRGBLinearColor = rgb2srgbLinear(rgb);
    expect(result.r).toBeCloseTo(0.539479, 4);
    expect(result.g).toBeCloseTo(0.304987, 4);
    expect(result.b).toBeCloseTo(0.06301, 4);
  });
});
