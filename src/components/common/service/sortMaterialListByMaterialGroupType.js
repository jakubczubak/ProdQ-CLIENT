export const sortMaterialListByMaterialGroupType = (materialList, materialGroupType) => {
  if (materialGroupType === 'Plate') {
    return materialList.sort((a, b) => {
      // Najpierw sortowanie po 'z'
      if (a.z !== b.z) return a.z - b.z;
      // Jeśli 'z' są równe, sortowanie po 'x'
      if (a.x !== b.x) return a.x - b.x;
      // Jeśli 'z' i 'x' są równe, sortowanie po 'y'
      return a.y - b.y;
    });
  } else if (materialGroupType === 'Rod') {
    return materialList.sort((a, b) => a.diameter - b.diameter);
  } else if (materialGroupType === 'Tube') {
    return materialList.sort((a, b) => {
      // Najpierw sortowanie po 'diameter' (rosnąco)
      if (a.diameter !== b.diameter) return a.diameter - b.diameter;
      // Jeśli 'diameter' są równe, sortowanie po 'thickness' (malejąco)
      return b.thickness - a.thickness;
    });
  }
};