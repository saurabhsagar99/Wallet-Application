import SideBar from "@/components/dashboard/SideBar";
import NavigationBar from "@/components/NavigationBar";
import { PortfolioProvider } from "@/contexts/PortfolioProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <PortfolioProvider>
          <NavigationBar />
          <div className="flex">
            <SideBar />
            <main className="flex-1 p-6 mb-14 md:mb-0">{children}</main>
          </div>
        </PortfolioProvider>
      </body>
    </html>
  );
}
