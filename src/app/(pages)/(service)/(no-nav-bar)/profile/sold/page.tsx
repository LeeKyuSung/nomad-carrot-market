import AppBar from "@/components/app-bar";
import ProductList from "@/components/product-list";

export default function Sold() {
  return (
    <AppBar title="판매내역" canGoBack>
      <div className="flex flex-col space-y-5 pb-10 divide-y">
        <ProductList kind="sales" />
      </div>
    </AppBar>
  );
}
