"use client";

import AppBar from "@/components/app-bar";
import Button from "@/components/button";
import useMutation from "@/libs/client/useMutation";
import { classNames } from "@/libs/client/utils";
import { Product } from "@prisma/client";
import Link from "next/link";
import useSWR, { useSWRConfig } from "swr";

interface ProductWithUser extends Product {
  user: {
    id: number;
    name: string;
    avatar: string;
  };
}
interface ProductDetailResponse {
  ok: boolean;
  product: ProductWithUser;
  isFav: boolean;
  relatedProducts: Product[];
}

export default function ProductDetail({ params }: { params: { id: string } }) {
  // const { mutate: unboundMutate } = useSWRConfig();
  const { data, mutate } = useSWR<ProductDetailResponse>(
    params.id ? `/api/products/${params.id}` : null
  );
  const [toggleFav, { loading }] = useMutation(
    `/api/products/${params.id}/fav`
  );
  const onFavClick = () => {
    if (!data || loading) return;
    mutate({ ...data, isFav: !data.isFav }, false);
    toggleFav({});
    // unboundMutate("/api/users/me", (prev: any) => ({ ok: !prev.ok }), false);
    // unboundMutate("/api/users/me"); // refetch
  };

  return (
    <AppBar title={data?.product.name} canGoBack>
      <div className="p-4">
        <div className="mb-8">
          <img
            src={`https://imagedelivery.net/9XhrxadWkcwKer2x3cW5Dw/${data?.product.image}/public`}
            className="h-96 bg-slate-300"
          />
          <Link href={`/users/profiles/${data?.product.user.id}`}>
            <div className="flex cursor-pointer py-3 border-t border-b items-center space-x-3">
              <img
                src={`https://imagedelivery.net/9XhrxadWkcwKer2x3cW5Dw/${data?.product.user.avatar}/avatar`}
                className="w-12 h-12 rounded-full bg-slate-300"
              />
              <div>
                <p className="text-sm font-medium text-gray-700">
                  {data?.product.user.name}
                </p>
                <p className="text-xs font-medium text-gray-500">
                  View profile &rarr;
                </p>
              </div>
            </div>
          </Link>
          <div className="mt-5">
            <h1 className="text-3xl font-bold text-gray-900">
              {data?.product.name}
            </h1>
            <span className="text-3xl mt-3 text-gray-900">
              {data?.product.price}
            </span>
            <p className="text-base my-6 text-gray-700">
              {data?.product.description}
            </p>
            <div className="flex items-center justify-between space-x-2.5">
              <Button large text="Talk to seller" />
              <button
                onClick={onFavClick}
                className={classNames(
                  "p-3 rounded-md flex items-center justify-center hover:bg-gray-100",
                  data?.isFav
                    ? "text-red-500 hover:text-red-600"
                    : "text-gray-400 hover:text-gray-500"
                )}
              >
                {data?.isFav ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                  </svg>
                ) : (
                  <svg
                    className="h-6 w-6 "
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
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Similar items</h2>
          <div className="mt-6 grid grid-cols-2 gap-4">
            {data?.relatedProducts.map((product) => (
              <Link key={product.id} href={`/products/${product.id}`}>
                <div className="h-56 w-full mb-4 bg-slate-300" />
                <h3 className="text-gray-700 -mb-1">{product.name}</h3>
                <p className="text-sm font-medium text-gray-900">
                  {product.price}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </AppBar>
  );
}
