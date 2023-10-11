import LayoutComponent from "@/components/layout-component";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <LayoutComponent title="나의 캐럿" hasTabBar="profile">
      {children}
    </LayoutComponent>
  );
}
