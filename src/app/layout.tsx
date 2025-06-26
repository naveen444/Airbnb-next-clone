import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "./components/Navbar";
import { Toaster } from "sonner";
import { ThemeProvider } from "./components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Airbnb Clone App",
  description: "A full-stack Airbnb clone app built with Next.js and Tailwind CSS. List, book, and manage properties with modern UI, authentication, and dynamic features.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased pb-[35px]`}
      >
				<ThemeProvider
					attribute="class"
					storageKey="theme"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					
					<Navbar />

					{children}
					<Toaster position="top-right" richColors />
				</ThemeProvider>
      </body>
    </html>
  );
}
