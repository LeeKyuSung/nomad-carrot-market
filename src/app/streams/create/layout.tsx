import LayoutComponent from "@/components/layout-component";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <LayoutComponent title="라이브 시작하기" canGoBack>
      {children}
    </LayoutComponent>
  );
}
