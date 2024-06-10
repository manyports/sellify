"use client"

import Image from "next/image";
import { useQuery } from 'react-query';
import { fetchProducts } from '@/api/serviceapi';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex justify-evenly mt-20 items-center">
      <div className="font-black text-[21px] sm:text-[30px]">
        <div className="max-w-[85%]">
          <p>
            Shop like <span className="text-[#77827B]">a trillionaire.</span>
          </p>
          <p>
            Shop <span className="text-[#77827B]">with us.</span> Sell your stuff, or buy stuff from others.
          </p>
        </div>
        <div className="flex mt-8">
          <Link href="/listings">
            <div className="bg-[#232323] border-2 border-[#77827B] rounded-[45px] text-[15px] px-4 py-1 text-center">
              Put on listing
            </div>
          </Link>
          <Link href="/deals">
            <div className="bg-[#77827B] border-2 border-[#77827B] rounded-[45px] text-[15px] px-4 py-1 text-center ml-3">
              Our deals
            </div>
          </Link>
        </div>
      </div>
      </div>
  );
}