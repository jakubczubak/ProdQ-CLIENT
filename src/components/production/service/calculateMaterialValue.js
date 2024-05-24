export function calculateMaterialValue(density, pricePerKg, dimensions) {
  const volume = calculateVolume(dimensions);
  const mass = calculateMass(density, volume);
  const value = calculateValue(mass, pricePerKg);
  return value.toFixed(2);
}

function calculateVolume(dimensions) {
  if (dimensions.x && dimensions.y && dimensions.z) {
    // Przeliczenie wymiarów z mm na metry
    const widthM = dimensions.x / 1000;
    const heightM = dimensions.y / 1000;
    const thicknessM = dimensions.z / 1000;
    return widthM * heightM * thicknessM;
  } else if (dimensions.diameter && dimensions.thickness && dimensions.length) {
    // Przeliczenie wymiarów z mm na metry
    const outerDiameterM = dimensions.diameter / 1000;
    const innerDiameterM = (dimensions.diameter - 2 * dimensions.thickness) / 1000;
    const lengthM = dimensions.length / 1000;
    console.log(
      Math.PI * (Math.pow(outerDiameterM / 2, 2) - Math.pow(innerDiameterM / 2, 2)) * lengthM
    );
    return Math.PI * (Math.pow(outerDiameterM / 2, 2) - Math.pow(innerDiameterM / 2, 2)) * lengthM;
  } else if (dimensions.diameter && dimensions.length) {
    // Przeliczenie wymiarów z mm na metry
    const outerDiameterM = dimensions.diameter / 1000;
    const lengthM = dimensions.length / 1000;
    return Math.PI * Math.pow(outerDiameterM / 2, 2) * lengthM;
  }
  return 0;
}

function calculateMass(density, volume) {
  // Przeliczenie gęstości z g/cm3 na kg/m3
  const densityKgPerM3 = density * 1000;
  return densityKgPerM3 * volume;
}

function calculateValue(mass, pricePerKg) {
  return mass * pricePerKg;
}
