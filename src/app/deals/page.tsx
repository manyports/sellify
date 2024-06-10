"use client";

import { useQuery } from 'react-query';
import { fetchProducts } from '@/api/serviceapi';
import Link from 'next/link';

export default function Deals(){
    const { data, isLoading, error } = useQuery('products', fetchProducts);
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {(error as Error).message}</div>;
    
    return(
        <div>
        <h1 className="text-3xl font-bold mb-4 text-center">Explore our best deals</h1>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 px-20">
          {data.map((product: any) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-evenly items-center">
              <img src={product.image} alt={product.title} className="rounded-lg mb-2 max-w-[12vw]" />
              <div className='flex flex-end flex-col'>
                <p className="font-semibold text-black">{product.title}</p>
                <p className="text-gray-600">${product.price}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-6">
          <Link href="/listings" className="bg-blue-500 text-white py-2 px-4 rounded inline-block">List a product</Link>
        </div>
      </div>
    )
}