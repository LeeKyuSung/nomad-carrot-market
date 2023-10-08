import LayoutComponent from "@/components/LayoutComponent";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <LayoutComponent title="구매내역" canGoBack>
      {children}
    </LayoutComponent>
  );
}
