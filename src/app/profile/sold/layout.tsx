import LayoutComponent from "@/components/LayoutComponent";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <LayoutComponent title="판매내역" canGoBack>
      {children}
    </LayoutComponent>
  );
}
