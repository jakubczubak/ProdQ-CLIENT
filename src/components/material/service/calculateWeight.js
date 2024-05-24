export const calculateWeight = (volume, density) => {
  const weight = (volume * density) / 1000000;
  return weight;
};
