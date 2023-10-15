import AppBar from "@/components/app-bar";
import ProductComponent from "@/components/product-component";

export default function Bought() {
  return (
    <AppBar title="구매내역" canGoBack>
      <div className="flex flex-col space-y-5 pb-10 divide-y">
        {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((_, i) => (
          <ProductComponent
            key={i}
            id={i}
            title="iPhone 14"
            price={99}
            comments={1}
            hearts={1}
          />
        ))}
      </div>
    </AppBar>
  );
}
