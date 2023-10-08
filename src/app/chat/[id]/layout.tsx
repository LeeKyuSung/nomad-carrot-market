import LayoutComponent from "@/components/LayoutComponent";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <LayoutComponent title="Steve Jobs" canGoBack>
      {children}
    </LayoutComponent>
  );
}
