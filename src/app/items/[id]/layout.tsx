import LayoutComponent from "@/components/LayoutComponent";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <LayoutComponent title="Galaxy S50" canGoBack={true}>
      {children}
    </LayoutComponent>
  );
}
