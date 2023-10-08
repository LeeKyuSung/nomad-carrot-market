import LayoutComponent from "@/components/LayoutComponent";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <LayoutComponent title="라이브" hasTabBar="streams">
      {children}
    </LayoutComponent>
  );
}
