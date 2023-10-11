import LayoutComponent from "@/components/layout-component";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <LayoutComponent title="동네생활" hasTabBar="community">
      {children}
    </LayoutComponent>
  );
}
