import { colorToOKLCH, RGBColor } from '../oklch';

describe('convert RGB to OKLCH', () => {
  it('convert red color', () => {
    const rgb: RGBColor = { r: 255 / 255, g: 0, b: 0 }; // Red color
    const result = colorToOKLCH(rgb, undefined);
    expect(result).toBe('oklch(62.8%, 0.258, 29.2)');
  });
  it('convert black color', () => {
    const rgb: RGBColor = { r: 0, g: 0, b: 0 }; // Black color
    const result = colorToOKLCH(rgb, undefined);
    expect(result).toBe('oklch(0%, 0, 0)');
  });
  it('convert black with opacity 50%', () => {
    const rgb: RGBColor = { r: 0, g: 0, b: 0 }; // Black color
    const result = colorToOKLCH(rgb, 0.5);
    expect(result).toBe('oklch(0%, 0, 0 / 50%)');
  });
  it('convert rgba(0, 100, 170, 0.75)', () => {
    const rgb = { r: 0, g: 100 / 255, b: 170 / 255 }; // Specific color
    const opacity = 0.75;
    const result = colorToOKLCH(rgb, opacity);
    expect(result).toBe('oklch(49.3%, 0.136, 248.9 / 75%)');
  });
  it('convert rgba(100, 110, 160, 0.25)', () => {
    const rgb = { r: 100 / 255, g: 110 / 255, b: 160 / 255 }; // Specific color
    const opacity = 0.25;
    const result = colorToOKLCH(rgb, opacity);
    expect(result).toBe('oklch(55.1%, 0.079, 274.9 / 25%)');
  });
  it('convert rgba(194, 150, 71, 1)', () => {
    const rgb = { r: 194 / 255, g: 150 / 255, b: 71 / 255 }; // Specific color
    const opacity = 1;
    const result = colorToOKLCH(rgb, opacity);
    expect(result).toBe('oklch(69.9%, 0.110, 79.9)');
  });
  it('clamps RGB values to 0-1 range', () => {
    const rgb = { r: -0.5, g: 1.2, b: 0.8 };
    const result = colorToOKLCH(rgb);
    expect(result).toBe('oklch(89.0%, 0.174, 171.3)'); // The result you expect after clamping
  });

  it('clamps opacity value less than 0 range', () => {
    const rgb = { r: 0.5, g: 0.5, b: 0.5 };
    const result = colorToOKLCH(rgb, -0.5);
    expect(result).toBe('oklch(59.8%, 0, 189.5 / 0%)'); // The result you expect after clamping
  });

  it('clamps opacity value more than 1 range', () => {
    const rgb = { r: 0.5, g: 0.5, b: 0.5 };
    const result = colorToOKLCH(rgb, 1.2);
    expect(result).toBe('oklch(59.8%, 0, 189.5)'); // The result you expect after clamping
  });
});
