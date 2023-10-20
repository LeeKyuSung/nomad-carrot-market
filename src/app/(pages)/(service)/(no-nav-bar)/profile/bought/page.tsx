import AppBar from "@/components/app-bar";
import ProductList from "@/components/product-list";

export default function Bought() {
  return (
    <AppBar title="구매내역" canGoBack>
      <div className="flex flex-col space-y-5 pb-10 divide-y">
        <ProductList kind="purchases" />
      </div>
    </AppBar>
  );
}
