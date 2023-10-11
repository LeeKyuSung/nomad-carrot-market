import LayoutComponent from "@/components/layout-component";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <LayoutComponent canGoBack title="Upload Product">
      {children}
    </LayoutComponent>
  );
}
