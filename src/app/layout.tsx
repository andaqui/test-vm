import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "Fotbolls-VM",
  description: "Följ alla matcher, grupper och tabeller i Fotbolls-VM",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sv">
      <body className="antialiased min-h-screen font-sans">
        <AppProvider>
          <Header />
          <main className="container mx-auto px-4 py-6">
            {children}
          </main>
        </AppProvider>
      </body>
    </html>
  );
}
