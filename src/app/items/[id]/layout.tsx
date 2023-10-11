import LayoutComponent from "@/components/layout-component";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <LayoutComponent title="Galaxy S50" canGoBack={true}>
      {children}
    </LayoutComponent>
  );
}
