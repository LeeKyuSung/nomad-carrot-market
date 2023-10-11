import LayoutComponent from "@/components/layout-component";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <LayoutComponent title="구매내역" canGoBack>
      {children}
    </LayoutComponent>
  );
}
