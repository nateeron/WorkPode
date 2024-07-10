import { combineReducers } from 'redux';
import {fetch_agen, input_reducers_Object} from './input_reducers_Object';

const rootReducer = combineReducers({
      input_info : input_reducers_Object,
      
    });
    
    export default rootReducer;