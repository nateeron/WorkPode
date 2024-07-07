import axios from 'axios';

const API_URL = 'https://script.google.com/macros/s/AKfycbyhf_Hn0-pqViRcAfAFjYGqRo2KDYZoIFgJ0yBDf3qXIzYdssy-Ulb9crptDPmeF2K4/exec';

export const getData = async () => {
  const response = await axios.post(API_URL, { action: 'read' });
  return response.data;
};

export const createData = async (values) => {
  const response = await axios.post(API_URL, { action: 'create', values });
  return response.data;
};

export const updateData = async (range, values) => {
  const response = await axios.post(API_URL, { action: 'update', range, values });
  return response.data;
};

export const deleteData = async (range) => {
  const response = await axios.post(API_URL, { action: 'delete', range });
  return response.data;
};

export const searchData = async (query) => {
  const response = await axios.post(API_URL, { action: 'search', query });
  return response.data;
};