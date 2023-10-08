import LayoutComponent from "@/components/LayoutComponent";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <LayoutComponent title="관심목록" canGoBack>
      {children}
    </LayoutComponent>
  );
}
