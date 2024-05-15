import { oklab2oklch } from '../oklch';

describe('Oklab to OKLCH conversion', () => {
  it('converts Oklab to OKLCH correctly', () => {
    const oklab = { l: 0.62, a: 0.11, b: 0.12 };
    const oklch = oklab2oklch(oklab);
    expect(oklch.l).toBeCloseTo(0.62, 4);
    expect(oklch.c).toBeCloseTo(Math.sqrt(0.11 ** 2 + 0.12 ** 2), 4);
    expect(oklch.h).toBeCloseTo(
      (Math.atan2(0.12, 0.11) * (180 / Math.PI) + 360) % 360,
      4
    );
  });

  it('throws error for non-finite hue values (NaN/Infinity)', () => {
    const oklabWithNaN = { l: 0.5, a: 0, b: NaN };
    expect(() => oklab2oklch(oklabWithNaN)).toThrow('Invalid hue value');
  });

  it('normalizes negative hue values', () => {
    const oklabNegativeHue = { l: 0.5, a: -0.3, b: 0.4 };
    const oklch = oklab2oklch(oklabNegativeHue);

    // Calculate the expected normalized hue manually:
    let expectedHue = Math.atan2(0.4, -0.3) * (180 / Math.PI);
    expectedHue = (expectedHue + 360) % 360;

    expect(oklch.h).toBeCloseTo(expectedHue, 4); // 4 decimal places precision
  });

  it('normalizes hue values greater than 360', () => {
    const oklabLargeHue = { l: 0.5, a: 0.2, b: 0.8 };
    const oklch = oklab2oklch(oklabLargeHue);

    // Calculate the expected normalized hue manually:
    let expectedHue = Math.atan2(0.8, 0.2) * (180 / Math.PI);
    expectedHue = (expectedHue + 360) % 360;

    expect(oklch.h).toBeCloseTo(expectedHue, 4);
  });
});
