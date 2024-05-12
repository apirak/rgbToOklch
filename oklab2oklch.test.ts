import { oklab2oklch } from './oklch';

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
});
