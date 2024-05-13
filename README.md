# Lightweight RGB to OKLCH Color Converter 🎨

Need to convert RGB colors to the OKLCH color space without the overhead of
loading a full-fledged library like `culori` (41k) or `colorjs` Look no further!
This tiny TypeScript code is here to save the day.

## Getting Started

Now you can start converting colors with ease:

```typescript
import { colorToOKLCH, RGB } from 'rgbToOklch';

const rgb: RGB = { r: 255 / 255, g: 0, b: 0 }; // Red color

const result = colorToOKLCH(rgb, undefined);

console.log(result); // oklch(62.8%, 0.258, 29.2)
```

A few notes:

- We use a normalized RGB format (values between 0 and 1), which is common in
  graphics programming environments like Figma and WebGL.

- The colorToOKLCH function returns the converted OKLCH color as a string, but
  you can modify it to return an object if you prefer.

## Testing the Waters 🧪

We've got a test suite set up with Jest to ensure everything is working as
expected. Additionally, we've included a validation script (oklchCulori.ts) that
uses the culori library for benchmarking and double-checking the results. To run
the tests and validations, simply run:

```bash
npm test
```

## Contributing 🤝

If you've got ideas for improvements or found a bug, feel free to open an issue
or submit a pull request. I'm always happy to learn and make this little library
even better!

## License 📄

This project is licensed under the
[MIT License](https://opensource.org/license/MIT). In other words, you can
pretty much do whatever you want with it, just don't hold me responsible if
things go sideways. 😄

That's it, folks! Happy lightweight color converting! 🌈
