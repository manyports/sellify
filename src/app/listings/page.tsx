"use client";

import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { createProduct } from '@/api/serviceapi';
import { useDropzone } from 'react-dropzone';

export default function CreateProduct() {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState<number>(0);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [submittedProducts, setSubmittedProducts] = useState<any[]>([]); 
  const queryClient = useQueryClient();

  const createProductMutation = useMutation(createProduct, {
    onSuccess: (data) => {
      queryClient.invalidateQueries('products');
      setSubmittedProducts([...submittedProducts, data]); 
      setTitle('');
      setPrice(0);
      setDescription('');
      setCategory('');
      setFiles([]);
      setUploadProgress(0);
    },
  });

  const handleFileUpload = async () => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('files', file);
    });

    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/upload');
    xhr.upload.onprogress = (event) => {
      const progress = Math.round((event.loaded / event.total) * 100);
      setUploadProgress(progress);
    };

    xhr.onload = () => {
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        const imageUrls = response.urls;
        createProductMutation.mutate({
          title,
          price,
          description,
          category,
          image: imageUrls[0],
        });
      }
    };

    xhr.send(formData);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (files.length) {
      handleFileUpload();
    } else {
      createProductMutation.mutate({
        title,
        price,
        description,
        category,
      });
    }
  };

  const onDrop = (acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div className="container px-[20vw]">
      <h1 className="text-2xl mb-4 font-black text-[40px]">List a product.</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-white font-semibold">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full py-3"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-white font-semibold">Price (KZT)</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="mt-1 block w-full py-3"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-white font-semibold">Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full py-3"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-white font-semibold">Category</label>
          <select
            name="category"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className='py-3'
          >
            <option value="electronics">Electronics</option>
            <option value="clothing">Clothing</option>
            <option value="accessories">Accessories</option>
            <option value="jewelry">Jewelry</option>
            <option value="home">Home</option>
            <option value="sports">Sports</option>
            <option value="toys">Toys</option>
            <option value="books">Books</option>
            <option value="beauty">Beauty</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div {...getRootProps()} className="mb-4 border-dashed border-2 border-gray-300 p-4 text-center">
          <input {...getInputProps()} />
          {files.length ? (
            files.map((file, index) => <p key={index}>{file.name}</p>)
          ) : (
            <p>Drag your files here :)</p>
          )}
        </div>
        {uploadProgress > 0 && uploadProgress < 100 && (
          <div className="mb-4">
            <progress className="w-full" value={uploadProgress} max="100" />
            <p className="text-sm text-white">{uploadProgress}% Uploaded</p>
          </div>
        )}
        <button type="submit" className="bg-[#77827B] text-white py-2 px-4 rounded">
          Create
        </button>
      </form>
      <div className="mt-8">
        <h1 className="text-2xl mb-4 font-black text-[40px]">Your listings</h1>
        {submittedProducts.map((product, index) => (
          <div key={index} className="border border-gray-300 p-4 mb-4">
            <h3>{product.title} for <b>{product.price} KZT. </b></h3>
            <p> <b>Short Description:</b> <br/> {product.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}