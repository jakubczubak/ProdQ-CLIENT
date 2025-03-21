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
import { cartManager } from '../../components/cart/service/cartManager';
import { productionCartManager } from '../../components/productionCart/service/productionCartManager';

// Pobierz wartości z localStorage podczas inicjalizacji
const boxQuantity = cartManager.accumulateQuantity();
const productionBoxQuantity = productionCartManager.accumulateQuantity();
const savedSidebarState = JSON.parse(localStorage.getItem('isNavbarHidden')) || false;
const savedDefaultNavItem = localStorage.getItem('defaultNavItem') || 'dashboard'; // Pobierz zapisany defaultNavItem

const initialState = {
  open: false,
  msg: '',
  severity: 'success',
  boxQuantity: boxQuantity ? boxQuantity : 0,
  productionBoxQuantity: productionBoxQuantity ? productionBoxQuantity : 0,
  notificationQuantity: -1,
  currentTask: '',
  openTaskModal: false,
  sidebar: savedSidebarState,
  mode: false, // SELECT MODE
  material: undefined,
  materialType: undefined,
  projectId: undefined,
  productionItem: undefined,
  materialProfile: undefined,
  defaultNavItem: savedDefaultNavItem // Ustaw domyślną wartość z localStorage
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_OPEN:
      return {
        ...state,
        open: true
      };

    case SET_CLOSE:
      return {
        ...state,
        open: false
      };

    case SET_MSG:
      return {
        ...state,
        msg: action.payload.msg
      };

    case SET_SEVERITY:
      return {
        ...state,
        severity: action.payload.severity
      };

    case SET_BOX_QUANTITY:
      return {
        ...state,
        boxQuantity: action.payload.boxQuantity
      };

    case SET_PRODUCTION_BOX_QUANTITY:
      return {
        ...state,
        productionBoxQuantity: action.payload.productionBoxQuantity
      };

    case SET_NOTIFICATION_QUANTITY:
      return {
        ...state,
        notificationQuantity: action.payload.notificationQuantity
      };

    case TOGGLE_SIDEBAR:
      return {
        ...state,
        sidebar: !state.sidebar
      };

    case SET_SELECT_MODE:
      return {
        ...state,
        mode: action.payload.selectMode
      };

    case SET_MATERIAL:
      return {
        ...state,
        material: action.payload.material
      };

    case SET_PROJECT_ID:
      return {
        ...state,
        projectId: action.payload.projectId
      };

    case SET_PRODUCTION_ITEM:
      return {
        ...state,
        productionItem: action.payload.productionItem
      };

    case SET_MATERIAL_TYPE:
      return {
        ...state,
        materialType: action.payload.materialType
      };

    case SET_MATERIAL_PROFILE:
      return {
        ...state,
        materialProfile: action.payload.materialProfile
      };

    case SET_DEFAULT_NAV_ITEM:
      // Zapisz nową wartość do localStorage
      localStorage.setItem('defaultNavItem', action.payload.defaultNavItem);
      return {
        ...state,
        defaultNavItem: action.payload.defaultNavItem
      };

    default:
      return state;
  }
};
