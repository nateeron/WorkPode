import { combineReducers } from "redux";
import { fetch_agen, input_reducers_Object } from "./input_reducers_Object";
import { Fetch_data, Fetch_menu1, Fetch_menu2, Fetch_menu3, Fetch_menu4, formReducer } from "./input_reducers_Object";
const rootReducer = combineReducers({
    oj_data: Fetch_data,
    oj_menu1: Fetch_menu1,
    oj_menu2: Fetch_menu2,
    oj_menu3: Fetch_menu3,
    oj_menu4: Fetch_menu4,
    form: formReducer,
});

export default rootReducer;
