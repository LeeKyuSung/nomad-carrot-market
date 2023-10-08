import LayoutComponent from "@/components/LayoutComponent";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <LayoutComponent title="나의 캐럿">{children}</LayoutComponent>;
}
