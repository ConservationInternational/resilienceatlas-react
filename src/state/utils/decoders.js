/* eslint-disable no-plusplus */
const bands = 4;

export const birds = (data, w, h, z, params) => {
  'use asm';

  const imgData = data;

  for (let i = 0; i < w; ++i) {
    for (let j = 0; j < h; ++j) {
      const pixelPos = (j * w + i) * bands;
      if (imgData[pixelPos] >= 100) {
        imgData[pixelPos + 3] = 0;
      } else {
        imgData[pixelPos] = 106;
        imgData[pixelPos + 1] = 196;
        imgData[pixelPos + 2] = 220;
      }
    }
  }
};

export default { birds };
