import LayoutComponent from "@/components/layout-component";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <LayoutComponent title="Lets try potatoes" canGoBack>
      {children}
    </LayoutComponent>
  );
}
