import LayoutComponent from "@/components/LayoutComponent";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <LayoutComponent title="Lets try potatoes" canGoBack>
      {children}
    </LayoutComponent>
  );
}
