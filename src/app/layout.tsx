import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mental Models App",
  description: "Mental models tech quiz",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="border-b border-black/5 bg-white/70">
          <div className="mx-auto flex w-full max-w-5xl flex-col gap-1 px-6 py-6">
            <p className="text-lg font-semibold text-slate-900">
              Mental Models Quiz
            </p>
            <p className="text-sm text-slate-600">
              Ćwiczenia nad modelami myślenia — bez punktów, bez rywalizacji.
            </p>
          </div>
        </header>
        {children}
        <footer className="border-t border-black/5 bg-white/70">
          <div className="mx-auto flex w-full max-w-5xl items-center px-6 py-6 text-sm text-slate-500">
            Ucz się modeli, nie wyników.
          </div>
        </footer>
      </body>
    </html>
  );
}
