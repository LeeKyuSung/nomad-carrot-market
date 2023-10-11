import LayoutComponent from "@/components/layout-component";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <LayoutComponent title="판매내역" canGoBack>
      {children}
    </LayoutComponent>
  );
}
