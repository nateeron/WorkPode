// input_reducers_Object.jsx
const initialState = {};

export const input_reducers_Object = (state2 = initialState, action) => {
    switch (action.type) {
        case "ADDINPUTC":
            const { name, data } = action.payload;
            return {
                ...state2,
                [name]: data,
            };
        case "ADD_ATINPUTC":
            const { ATname, ATdata } = action.payload;
            return {
                ...state2,
                [ATname]: ATdata,
            };

        case "ADDUSERTOBJECTINPUTC":
            // OBJECT
            const oj =
                action.payload.length != 0
                    ? {
                          inputc_username: action.payload[0].username,
                          inputc_password: action.payload[0].password,
                          inputc_agentcode: action.payload[0].clientCode,
                          inputc_suppliercode: action.payload[0].supplierCode,
                          inputc_suppliercode_: action.payload[0].supplierCode,
                          inputc_XMLSUPPLIERCODE: action.payload[0].xmL_SUPPLIER_CODE,
                          inputc_XMLSUPPLIERCODE_: action.payload[0].xmL_SUPPLIER_CODE,
                          inputc_Hotel: action.payload[0].hotel,
                          inputc_Tour: action.payload[0].tour,
                          inputc_Transfer: action.payload[0].transfer,
                      }
                    : {};
            return oj;
        default:
            return state2;
    }
};

export const fetch_agen = (state2 = initialState, action) => {
    switch (action.type) {
        case "FETCH_AGEN":
            // OBJECT
            return action.payload;
        case "FETCH_AGEN_ERROR":
            // OBJECT
            return action.payload;
        default:
            return state2;
    }
};
export const Fetch_menu1 =(state2 = initialState, action) => {
  switch (action.type) {
      case "FETCH_MENU1":
          // OBJECT
          return action.payload;
      case "FETCH_MENU1_ERROR":
          // OBJECT
          return action.payload;
      default:
          return state2;
  }
};
export const Fetch_menu2 =(state2 = initialState, action) => {
  switch (action.type) {
      case "FETCH_MENU2":
          // OBJECT
          return action.payload;
      case "FETCH_MENU2_ERROR":
          // OBJECT
          return action.payload;
      default:
          return state2;
  }
};
export const Fetch_menu3 =(state2 = initialState, action) => {
  switch (action.type) {
      case "FETCH_MENU3":
          // OBJECT
          return action.payload;
      case "FETCH_MENU3_ERROR":
          // OBJECT
          return action.payload;
      default:
          return state2;
  }
};
export const Fetch_menu4 =(state2 = initialState, action) => {
  switch (action.type) {
      case "FETCH_MENU4":
          // OBJECT
          return action.payload;
      case "FETCH_MENU4_ERROR":
          // OBJECT
          return action.payload;
      default:
          return state2;
  }
};
export const Fetch_data = (state2 = initialState, action) => {
    switch (action.type) {
        case "FETCH_DATA":
          return  action.payload;
        case "FETCH_DATA_ERROR":
            // OBJECT
            return action.payload;
        default:
            return state2;
    }
};

export const fetch_Menu1 = (state2 = initialState, action) => {
  switch (action.type) {
      case "FETCH_MENU1":
          // OBJECT
          return action.payload;
      case "FETCH_MENU1_ERROR":
          // OBJECT
          return action.payload;
      default:
          return state2;
  }
};

export const formReducer = (state = initialState, action) => {
    switch (action.type) {
      case "ADD_FORM_DATA":
        return {
          ...state,
          formData: action.payload,
        };
      default:
        return state;
    }
  };