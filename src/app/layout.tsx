import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "../components/header";
import Footer from "../components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

const roboto = Roboto({
  subsets: ['vietnamese'],
  display: 'swap',
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-roboto'
})

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const SSToken: any = cookieStore.get('SSToken');
  function userInfo() {
    if (SSToken) {
      try {
        const decoded: any = jwtDecode(SSToken);
        return decoded?.data || {};
      } catch (error) {
        console.error("JWT decoding error:", error);
        return {};
      }
    } else {
      return {}
    }
  }
  return (
    <html lang="vi" suppressHydrationWarning>
      <body
        className={`${roboto.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header SSToken={SSToken} userInfor={userInfo()}></Header>
          {children}
          <Footer></Footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
