// import { useSelector, useDispatch } from "react-redux";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { API_URLS } from "../api/sheetsApi";

const FetchStoreObject = async ({ OjName }) => {
    const dispatch = useDispatch();
    try {
        switch (OjName) {
            case "read":
                console.log("************** FetchStoreObject 2 ******************");

                //Check data in Store
                const LoadSto = ""; //useSelector((state) => state.oj_data);
                console.log("$$$$$$$$$$$$$$$$$$$$$$$ Check LoadSto : ");

                if (!LoadSto) {
                    const resp = await GetData(API_URLS.API_READ);
                    if (resp && resp.data && resp.data.values) {
                        console.log(resp.data.values);
                        const Action = "FETCH_READ";
                        dispatch(dispatchAction(Action, resp.data.values));
                    }

                    return resp.data;
                } else {
                    return LoadSto;
                }
        }
    } catch (error) {
        console.log(error + "\nsrc\\redux\\Main_FetchStore.jsx");
    }
};
export default FetchStoreObject;

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
        const response = await instance.post("", { action: "read" });
        if (response) return response;
        return [];
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};
