import LayoutComponent from "@/components/LayoutComponent";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <LayoutComponent canGoBack={true}>{children}</LayoutComponent>;
}
