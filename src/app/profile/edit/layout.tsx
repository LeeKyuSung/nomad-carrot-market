import LayoutComponent from "@/components/LayoutComponent";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <LayoutComponent title="Edit profile" canGoBack>
      {children}
    </LayoutComponent>
  );
}
