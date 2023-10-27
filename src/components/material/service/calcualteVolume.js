export const calculateVolume = (x, y, z, diameter, thickness, length, type) => {
  if (type == 'Plate') {
    const volume = x * y * z;
    return volume;
  } else if (type == 'Rod') {
    const volume = Math.PI * (diameter / 2) ** 2 * length;
    return volume;
  } else if (type == 'Tube') {
    const inner_diameter = diameter - 2 * thickness;
    const volume = Math.PI * ((diameter / 2) ** 2 - (inner_diameter / 2) ** 2) * length;
    return volume;
  }
};
