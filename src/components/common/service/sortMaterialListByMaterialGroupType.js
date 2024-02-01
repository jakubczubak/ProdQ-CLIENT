export const sortMaterialListByMaterialGroupType = (materialList, materialGroupType) => {
  if (materialGroupType === 'Plate') {
    return materialList.sort((a, b) => a.z - b.z);
  } else {
    return materialList.sort((a, b) => a.diameter - b.diameter);
  }
};
