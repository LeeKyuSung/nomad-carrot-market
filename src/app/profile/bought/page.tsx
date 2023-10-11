import Item from "@/components/item";

export default function Bought() {
  return (
    <div className="flex flex-col space-y-5 pb-10 divide-y">
      {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((_, i) => (
        <Item
          key={i}
          id={i}
          title="iPhone 14"
          price={99}
          comments={1}
          hearts={1}
        />
      ))}
    </div>
  );
}
