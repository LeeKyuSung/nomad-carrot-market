import LayoutComponent from "@/components/layout-component";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <LayoutComponent title="Edit profile" canGoBack>
      {children}
    </LayoutComponent>
  );
}
