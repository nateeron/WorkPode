import axios from 'axios';

//const API_URL = 'https://script.google.com/macros/s/AKfycbyhf_Hn0-pqViRcAfAFjYGqRo2KDYZoIFgJ0yBDf3qXIzYdssy-Ulb9crptDPmeF2K4/exec';
const API_URLs = 'http://127.0.0.1:5000/read'
const API_URL = 'https://sendmailpode-04f4c6126331.herokuapp.com/'


const instance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
    // You generally do not need to set CORS headers here
  }
});

export const getData = async () => {
  try {
    const URL = API_URL+'read'
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
    const URL = API_URL+'menu/read'
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