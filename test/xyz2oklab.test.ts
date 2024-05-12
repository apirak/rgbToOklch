import { XYZColor } from '../oklch';
import { xyz2oklab as xyz2oklab } from '../oklch';

describe('Test xyz2oklab', () => {
  describe('XYZ to Oklab conversion', () => {
    it('convert XYZ from sRGB linear red color to Oklab', () => {
      const xyz: XYZColor = {
        x: 0.41239079926595934,
        y: 0.21263900587151027,
        z: 0.01933081871559182,
      }; // From previous test
      const oklab = xyz2oklab(xyz);
      expect(oklab.l).toBeCloseTo(0.6279536130288479, 4);
      expect(oklab.a).toBeCloseTo(0.22482856719742475, 4);
      expect(oklab.b).toBeCloseTo(0.125846277330585, 4);
    });

    it('convert XYZ from sRGB linear black color to Oklab', () => {
      const xyz: XYZColor = { x: 0, y: 0, z: 0 }; // From previous test
      const oklab = xyz2oklab(xyz);
      expect(oklab.l).toBeCloseTo(0, 4);
      expect(oklab.a).toBeCloseTo(0, 4);
      expect(oklab.b).toBeCloseTo(0, 4);
    });

    it('convert sRGB linear rgba(0, 100, 170) to XYZ', () => {
      const xyz: XYZColor = {
        x: 0.11811898539532916373190043859354,
        y: 0.12015914419204324576718115172908,
        z: 0.3972827104775062296376240705382314,
      };
      const oklab = xyz2oklab(xyz);
      expect(oklab.l).toBeCloseTo(0.49322612275894034, 4);
      expect(oklab.a).toBeCloseTo(-0.04883714671133044, 4);
      expect(oklab.b).toBeCloseTo(-0.12672122785025092, 4);
    });

    it('convert sRGB linear rgba(100, 110, 160) to XYZ', () => {
      const xyz: XYZColor = {
        x: 0.127438,
        y: 0.155926,
        z: 0.351533,
      };
      const oklab = xyz2oklab(xyz);
      expect(oklab.l).toBeCloseTo(0.5323193327437917, 4);
      expect(oklab.a).toBeCloseTo(-0.0688554589435113, 4);
      expect(oklab.b).toBeCloseTo(-0.08354177453964434, 4);
    });

    it('convert XYZ from specific sRGB linear color to Oklab', () => {
      const xyz: XYZColor = {
        x: 0.34290684539007085761286,
        y: 0.33738026587077791918843,
        z: 0.10667445996834347393104,
      }; // From previous test
      const oklab = xyz2oklab(xyz);
      expect(oklab.l).toBeCloseTo(0.6990810100148211, 4);
      expect(oklab.a).toBeCloseTo(0.019299716453673565, 4);
      expect(oklab.b).toBeCloseTo(0.10830610510595085, 4);
    });
  });

  // Here you would add conversion from Oklab to OKLCH if needed
});
