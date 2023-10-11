import LayoutComponent from "@/components/layout-component";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <LayoutComponent title="홈" hasTabBar="home">
      {children}
    </LayoutComponent>
  );
}
