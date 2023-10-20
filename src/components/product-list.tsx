"use client";
import useSWR from "swr";
import ProductComponent from "./product-component";

interface ProductListProps {
  kind: "favs" | "sales" | "purchases";
}
interface ProductListResponse {
  ok: boolean;
  data: {
    id: number;
    product: {
      id: number;
      name: string;
      description: string;
      price: number;
      image: string;
      _count: {
        Fav: number;
      };
    };
  }[];
}

export default function ProductList({ kind }: ProductListProps) {
  const { data: res } = useSWR<ProductListResponse>(`/api/users/me/${kind}`);
  return res && res.ok ? (
    <>
      {res.data?.map((record) => (
        <ProductComponent
          id={record.id}
          key={record.id}
          title={record.product.name}
          price={record.product.price}
          hearts={record.product._count.Fav}
        />
      ))}
    </>
  ) : null;
}
