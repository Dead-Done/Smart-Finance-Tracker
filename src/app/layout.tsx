import { ClerkProvider } from "@clerk/nextjs";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";

const montserrat = Montserrat();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${montserrat.className} mt-2 mb-2`}>
          <Header />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
