import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/footer";
import Header from "@/components/header";

export const metadata: Metadata = {
  title: "Coincart.us: Email Manager",
  description: "Manage your emails with Coincart.us",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="flex flex-col min-h-screen">
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
