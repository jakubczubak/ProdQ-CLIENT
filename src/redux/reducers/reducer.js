import {
  SET_OPEN,
  SET_CLOSE,
  SET_MSG,
  SET_SEVERITY,
  SET_BOX_QUANTITY,
  SET_NOTIFICATION_QUANTITY,
  SET_PRODUCTION_BOX_QUANTITY
} from '../actionTypes/actionTypes';
import { cartManager } from '../../components/cart/service/cartManager';
import { productionCartManager } from '../../components/productionCart/service/productionCartManager';

const boxQuantity = cartManager.accumulateQuantity();
const productionBoxQuantity = productionCartManager.accumulateQuantity();

const initialState = {
  open: false,
  msg: '',
  severity: 'success',
  boxQuantity: boxQuantity ? boxQuantity : 0,
  productionBoxQuantity: productionBoxQuantity ? productionBoxQuantity : 0,
  notificationQuantity: -1,
  currentTask: '',
  openTaskModal: false
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

    default:
      return state;
  }
};
