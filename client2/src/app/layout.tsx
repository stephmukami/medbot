import type { Metadata } from "next";
import { Roboto_Flex } from "next/font/google";
import "./globals.css";
import ToasterContext from "./context/ToasterContext";
import AuthProvider from "./context/AuthContext";

const inter = Roboto_Flex({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MedBot",
  description: "Your diagnosis guide",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
        <ToasterContext/>
        {children}
        </AuthProvider>
 
        </body>
    </html>
  );
}
