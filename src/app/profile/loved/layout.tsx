import LayoutComponent from "@/components/layout-component";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <LayoutComponent title="관심목록" canGoBack>
      {children}
    </LayoutComponent>
  );
}
