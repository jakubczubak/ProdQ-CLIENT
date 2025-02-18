import {
  SET_OPEN,
  SET_CLOSE,
  SET_MSG,
  SET_SEVERITY,
  SET_BOX_QUANTITY,
  SET_NOTIFICATION_QUANTITY,
  SET_PRODUCTION_BOX_QUANTITY,
  TOGGLE_SIDEBAR,
  SET_SELECT_MODE,
  SET_MATERIAL,
  SET_PROJECT_ID,
  SET_PRODUCTION_ITEM,
  SET_MATERIAL_TYPE,
  SET_MATERIAL_PROFILE,
  SET_DEFAULT_NAV_ITEM

} from '../actionTypes/actionTypes';

const setOpen = () => {
  return {
    type: SET_OPEN
  };
};

const setClose = () => {
  return {
    type: SET_CLOSE
  };
};

const setMsg = (msg) => {
  return {
    type: SET_MSG,
    payload: {
      msg: msg
    }
  };
};

const setSeverity = (severity) => {
  return {
    type: SET_SEVERITY,
    payload: {
      severity: severity
    }
  };
};

const setBoxQuantity = (boxQuantity) => {
  return {
    type: SET_BOX_QUANTITY,
    payload: {
      boxQuantity: boxQuantity
    }
  };
};

const setProductionBoxQuantity = (productionBoxQuantity) => {
  return {
    type: SET_PRODUCTION_BOX_QUANTITY,
    payload: {
      productionBoxQuantity: productionBoxQuantity
    }
  };
};

const setNotificationQuantity = (notificationQuantity) => {
  return {
    type: SET_NOTIFICATION_QUANTITY,
    payload: {
      notificationQuantity: notificationQuantity
    }
  };
};

const toggleSidebar = () => {
  return {
    type: TOGGLE_SIDEBAR
  };
};

const setSelectMode = (selectMode) => {
  return {
    type: SET_SELECT_MODE,
    payload: {
      selectMode: selectMode
    }
  };
};

const setMaterial = (material) => {
  return {
    type: SET_MATERIAL,
    payload: {
      material: material
    }
  };
};

const setProjectId = (projectId) => {
  return {
    type: SET_PROJECT_ID,
    payload: {
      projectId: projectId
    }
  };
};

const setProductionItem = (productionItem) => {
  return {
    type: SET_PRODUCTION_ITEM,
    payload: {
      productionItem: productionItem
    }
  };
};

const setMaterialType = (materialType) => {
  return {
    type: SET_MATERIAL_TYPE,
    payload: {
      materialType: materialType
    }
  };
};

const setMaterialProfileRedux = (materialProfile) => {
  return {
    type: SET_MATERIAL_PROFILE,
    payload: {
      materialProfile: materialProfile
    }
  };
};


const setDefaultNavItem = (defaultNavItem) => {
  return {
    type: SET_DEFAULT_NAV_ITEM,
    payload: {
      defaultNavItem: defaultNavItem
    }
  }
}

export {
  setOpen,
  setClose,
  setMsg,
  setSeverity,
  setBoxQuantity,
  setNotificationQuantity,
  setProductionBoxQuantity,
  toggleSidebar,
  setSelectMode,
  setMaterial,
  setProjectId,
  setProductionItem,
  setMaterialType,
  setMaterialProfileRedux,
  setDefaultNavItem
};
