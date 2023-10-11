import LayoutComponent from "@/components/layout-component";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <LayoutComponent title="제목" canGoBack>
      {children}
    </LayoutComponent>
  );
}
