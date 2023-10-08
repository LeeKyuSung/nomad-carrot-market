import LayoutComponent from "@/components/LayoutComponent";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <LayoutComponent title="동네생활" hasTabBar>
      {children}
    </LayoutComponent>
  );
}
