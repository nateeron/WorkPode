import axios from 'axios';
const API_Library = import.meta.env.VITE_API_URL;



export const API_URLS = {
  
  API_READ : `${API_Library}/read`,
  API_create : `${API_Library}/create`,
  API_update : `${API_Library}/update`,
  API_delete : `${API_Library}/delete`,

  API_MENU_READ: `${API_Library}/menu/read`,
  API_MENU_create : `${API_Library}/menu/create`,
  API_MENU_update : `${API_Library}/menu/update`,
  API_MENU_delete : `${API_Library}/menu/delete`,

}




const instance = axios.create({
  baseURL: API_URLS.API_READ,
  headers: {
    'Content-Type': 'application/json'
    // You generally do not need to set CORS headers here
  }
});





export const getData = async () => {
  try {
    const URL = API_URLS.API_READ
    // const response = await instance.post('', { action: 'read' });
    const response = await axios.get(URL);
    if (response)
      return response.data;
    return [];

  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const createData = async (values) => {
  try {
    const response = await axios.post(API_URL, { action: 'create', values });
    return response.data;
  } catch (error) {
    console.error('Error creating data:', error);
    throw error;
  }
};

export const updateData = async (range, values) => {
  try {
    const response = await axios.post(API_URL, { action: 'update', range, values });
    return response.data;
  } catch (error) {
    console.error('Error updating data:', error);
    throw error;
  }
};

export const deleteData = async (range) => {
  try {
    const response = await axios.post(API_URL, { action: 'delete', range });
    return response.data;
  } catch (error) {
    console.error('Error deleting data:', error);
    throw error;
  }
};

export const searchData = async (query) => {
  try {
    const response = await axios.post(API_URL, { action: 'search', query });
    return response.data;
  } catch (error) {
    console.error('Error searching data:', error);
    throw error;
  }
};


// ------------------ Get Menu -----------------------

export const getmenu = async (i) => {
  try {
    const URL = API_URLS.API_MENU_READ
    // const response = await instance.post('', { action: 'read' });
    const response = await axios.post(URL,{ i: i },{
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
 

  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};