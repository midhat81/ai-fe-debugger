import type { Metadata } from "next";
import "./globals.css";
import SDKProvider from "@/components/SDKProvider";

export const metadata: Metadata = {
  title: "AI Frontend Debugger",
  description: "AI-powered session replay and debugging tool",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        <SDKProvider>
          {children}
        </SDKProvider>
      </body>
    </html>
  );
}