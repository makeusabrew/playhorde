export const random = (min, max) => {
  const diff = max - min;
  return min + Math.floor(Math.random() * diff);
};

export const frandom = (min, max) => {
  const diff = max - min;
  return min + (Math.random() * diff);
};

export const isAngleContained = (min, a, max) => {
  // find out how far off zero min is, from a "clockwise" perspective
  const delta = 360 - min;
  // reset min
  min = 0;
  // wind target angle on by the delta, keeping within bounds
  a = (a + delta) % 360;
  // wind max angle on by the delta, keeping within bounds
  max = (max + delta) % 360;

  return min <= a && a <= max;
};
