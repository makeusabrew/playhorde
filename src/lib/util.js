export const random = (min, max) => {
  const diff = max - min;
  return min + Math.floor(Math.random() * diff);
};

export const frandom = (min, max) => {
  const diff = max - min;
  return min + (Math.random() * diff);
};
