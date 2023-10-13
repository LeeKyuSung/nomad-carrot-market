import LayoutComponent from "@/components/app-bar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <LayoutComponent title="라이브 시작하기" canGoBack>
      {children}
    </LayoutComponent>
  );
}
