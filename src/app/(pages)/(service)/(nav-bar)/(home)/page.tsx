"use client";

import FloatingButton from "@/components/floating-button";
import ProductComponent from "@/components/product-component";
import "@/libs/server/client";
import AppBar from "@/components/app-bar";
import useSWR from "swr";
import { Product } from "@prisma/client";

interface ProductWithCount extends Product {
  _count: {
    Favorite: number;
  };
}
interface ProductResponse {
  ok: boolean;
  products: ProductWithCount[];
}

export default function Home() {
  const { data } = useSWR<ProductResponse>("/api/products");
  console.log(data);
  return (
    <AppBar title="홈">
      <div className="flex flex-col space-y-5 divide-y">
        {data?.products?.map((product) => (
          <ProductComponent
            id={product.id}
            key={product.id}
            title={product.name}
            price={product.price}
            hearts={product._count.Favorite}
          />
        ))}
      </div>
      <FloatingButton href="/products/upload">
        <svg
          className="h-6 w-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      </FloatingButton>
    </AppBar>
  );
}
