import LayoutComponent from "@/components/LayoutComponent";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <LayoutComponent title="제목" canGoBack>
      {children}
    </LayoutComponent>
  );
}
