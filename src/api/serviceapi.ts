import axios from 'axios';


const authenticatedApi = axios.create({
  baseURL: 'https://fakestoreapi.com',
  headers: {
    Authorization: 'Bearer YOUR_ACCESS_TOKEN', 
  },
});

const fileApi = axios.create({
  baseURL: 'https://fakeapi.platzi.com',
  headers: {
    Authorization: 'Bearer YOUR_ACCESS_TOKEN',
  },
});

export const fetchProducts = async () => {
  const response = await authenticatedApi.get('/products');
  return response.data;
};

export const createProduct = async (product: { title: string; price: number; description: string; image?: string[]; category: string }) => {
  const response = await authenticatedApi.post('/products', product);
  return response.data;
};

export const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fileApi.post('/en/rest/files/upload-file', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

export const uploadImages = async (files: File[]) => {
  const formData = new FormData();
  files.forEach(file => {
    formData.append('files', file);
  });

  const response = await fileApi.post('/en/rest/files/upload-file', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }); 

  return response.data;
};

export const fetchUserListings = async () => {
  const response = await axios.get('/api/user/listings');
  return response.data;
};