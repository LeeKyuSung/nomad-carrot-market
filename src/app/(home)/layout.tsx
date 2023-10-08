import LayoutComponent from "@/components/LayoutComponent";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <LayoutComponent title="홈" hasTabBar>
      {children}
    </LayoutComponent>
  );
}