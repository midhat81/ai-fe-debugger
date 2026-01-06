import type { Metadata } from "next";
import "./globals.css";

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
        {children}
      </body>
    </html>
  );
}