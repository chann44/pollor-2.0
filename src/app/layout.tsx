import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/navbar/site-header";
import { SiteFooter } from "@/components/footer/site-footer";
import { ThemeProvider } from "@/providers/theme-provider";
import { AuthProviders } from "@/providers/auth-providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pollor",
  description: "new way of creating anonymous polls",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
  auth: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProviders>
            <div className="container">
              <SiteHeader />
              {children}
              <SiteFooter />
            </div>
          </AuthProviders>
        </ThemeProvider>
      </body>
    </html>
  );
}
