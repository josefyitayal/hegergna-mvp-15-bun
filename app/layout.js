import localFont from "next/font/local";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Providers } from "@/provider/tanstackProvider";
import { Toaster } from "@/components/ui/toaster";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "HegergnaShop",
  description: "Bring you store to internet with hegergna",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
        <html lang="en">
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Providers>
            <main>{children}</main>
            <Toaster />
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
