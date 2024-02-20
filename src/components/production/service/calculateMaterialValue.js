export function calculateMaterialValue(density, pricePerKg, dimensions) {
  const volume = calculateVolume(dimensions);
  const mass = calculateMass(density, volume);
  const value = calculateValue(mass, pricePerKg);
  return value.toFixed(2);
}

function calculateVolume(dimensions) {
  if (dimensions.width && dimensions.height && dimensions.thickness) {
    // Przeliczenie wymiarów z mm na metry
    const widthM = dimensions.width / 1000;
    const heightM = dimensions.height / 1000;
    const thicknessM = dimensions.thickness / 1000;
    return widthM * heightM * thicknessM;
  } else if (dimensions.outerDiameter && dimensions.innerDiameter && dimensions.length) {
    // Przeliczenie wymiarów z mm na metry
    const outerDiameterM = dimensions.outerDiameter / 1000;
    const innerDiameterM = dimensions.innerDiameter / 1000;
    const lengthM = dimensions.length / 1000;
    return Math.PI * (Math.pow(outerDiameterM, 2) - Math.pow(innerDiameterM, 2)) * lengthM;
  } else if (dimensions.outerDiameter && dimensions.length) {
    // Przeliczenie wymiarów z mm na metry
    const outerDiameterM = dimensions.outerDiameter / 1000;
    const lengthM = dimensions.length / 1000;
    return Math.PI * Math.pow(outerDiameterM, 2) * lengthM;
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
