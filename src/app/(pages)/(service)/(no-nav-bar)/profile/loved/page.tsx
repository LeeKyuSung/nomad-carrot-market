import AppBar from "@/components/app-bar";
import ProductList from "@/components/product-list";

export default function Loved() {
  return (
    <AppBar title="관심목록" canGoBack>
      <div className="flex flex-col space-y-5 pb-10 divide-y">
        <ProductList kind="favs" />
      </div>
    </AppBar>
  );
}
