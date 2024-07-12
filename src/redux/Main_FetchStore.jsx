import React, { useEffect } from "react";

import axios from "axios";
import { API_URLS } from "../api/sheetsApi";

const FetchStoreObject = async (dispatch, OjName, defdata, i) => {
    try {
        switch (OjName) {
            case "read":
                //Check data in Store
                if (!defdata || Object.keys(defdata).length === 0) {
                    const resp = await GetData(API_URLS.API_READ);
                    if (resp && resp.data && resp.data.values) {
                        const resp_ = resp.data.values;
                        const Action = "FETCH_DATA";
                        dispatch(dispatchAction(Action, resp.data.values));
                        console.log(resp.data.values);
                        return resp.data.values;
                    } else {
                        console.log("************** NEW LOAD Not data ******************");
                        return [];
                    }
                } else {
                    console.log("************** Not NEW  LOAD ******************");
                    console.log(defdata);

                    return defdata;
                }
            case "menu_read":
                //Check data in Store
                if (!defdata || Object.keys(defdata).length === 0) {
                    const resp = await PostData(API_URLS.API_MENU_READ, { i: i });
                    if (resp && resp.data && resp.data.values) {
                        const resp_ = resp.data.values;
                        const Action = "FETCH_MENU"+i;
                        dispatch(dispatchAction(Action, resp.data.values));
                        console.log(resp.data.values);
                        return resp.data.values;
                    } else {
                        console.log("************** NEW LOAD Not data ******************");
                        return [];
                    }
                } else {
                    console.log("************** Not NEW  LOAD ******************");
                    console.log(defdata);

                    return defdata;
                }
        }
    } catch (error) {
        console.log(error + "\nsrc\\redux\\Main_FetchStore.jsx");
    }
};
export default FetchStoreObject;

// export const Reset_FetchStoreObject = async (dispatch, OjName, defdata) => {
//     try {
//         switch (OjName) {
//             case "read":
//                 const resp = await GetData(API_URLS.API_READ);
//                 if (resp && resp.data && resp.data.values) {
//                     console.log(resp.data.values);
//                     const Action = "FETCH_DATA";
//                     // ยัดเข้า Store
//                     dispatch(dispatchAction(Action, resp.data.values));
//                     return resp.data.values;
//                 }
//                 return [];
//         }
//     } catch (error) {
//         console.log(error + "\nsrc\\redux\\Main_FetchStore.jsx");
//     }
// };

export const dispatchAction = (nameFunc, payload) => ({
    type: nameFunc,
    payload,
});

const GetData = async (URL, req) => {
    try {
        // const response = await instance.post('', { action: 'read' });
        const response = await axios.get(URL);

        if (response) return response;
        return [];
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};

const PostData = async (URL, req) => {
    try {
        const response = await axios.post(URL, req, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (response) {
            return response;
        }else{
            return [];
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};

export const getmenuasdasd = async (i) => {
    try {
        const URL = API_URLS.API_MENU_READ;
        // const response = await instance.post('', { action: 'read' });
        const response = await axios.post(
            URL,
            { i: i },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};
