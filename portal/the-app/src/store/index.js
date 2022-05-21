import { createStore } from 'redux' ;
import stateReducer from '../redux/states';

const store = createStore(stateReducer);

export default store ;