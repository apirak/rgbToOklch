import { rgb2srgbLinear, RGBColor, sRGBLinearColor } from '../oklch';

describe('Test rgb2srgbLinear', () => {
  it('convert red color', () => {
    const rgb = { r: 255 / 255, g: 0, b: 0 }; // Red color
    const result: sRGBLinearColor = rgb2srgbLinear(rgb);
    expect(result.r).toBeCloseTo(0.0003035269835488375, 4);
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
    expect(result.g).toBeCloseTo(0.0001190301896269951, 4);
    expect(result.b).toBeCloseTo(0.00020235132236589166, 4);
  });

  it('convert rgba(100, 110, 160, 0.25)', () => {
    const rgb = { r: 100 / 255, g: 110 / 255, b: 160 / 255 }; // Specific color
    const result: sRGBLinearColor = rgb2srgbLinear(rgb);
    expect(result.r).toBeCloseTo(0.0001190301896269951, 4);
    expect(result.g).toBeCloseTo(0.0001309332085896946, 4);
    expect(result.b).toBeCloseTo(0.00019044830340319215, 4);
  });

  it('convert rgba(194, 150, 71)', () => {
    const rgb = { r: 194 / 255, g: 150 / 255, b: 71 / 255 }; // Specific color
    const result: sRGBLinearColor = rgb2srgbLinear(rgb);
    expect(result.r).toBeCloseTo(0.00023091856787637048, 4);
    expect(result.g).toBeCloseTo(0.00017854528444049265, 4);
    expect(result.b).toBeCloseTo(0.00008451143463516653, 4);
  });
});
