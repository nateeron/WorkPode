import axios from 'axios';
const API_Library = import.meta.env.VITE_API_URL;



export const API_URLS = {
  MAIN_API : API_Library,
  API_READ : `${API_Library}/read`,
  API_create : `${API_Library}/create`,
  API_update : `${API_Library}/update`,
  API_delete : `${API_Library}/delete`,

  Upload : `${API_Library}/upload`,

  API_MENU_READ: `${API_Library}/menu/read`,
  API_MENU_create : `${API_Library}/menu/create`,
  API_MENU_update : `${API_Library}/menu/update`,
  API_MENU_delete : `${API_Library}/menu/delete`,

}



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