import { createStore } from 'redux';
import { materialReducer } from './reducers/materialReducer';

const store = createStore(materialReducer);

export default store;
