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
  title: "월간로그",
  description: "블로그 스터디원들의 월간 활동 로그",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="min-h-screen bg-gray-50">
          {/* 공통 헤더 */}
          <header className="border-b bg-white">
            <div className="container mx-auto px-4 py-4">
              <h1 className="text-2xl font-bold">월간로그</h1>
            </div>
          </header>

          {/* 페이지 내용 */}
          {children}
        </div>
      </body>
    </html>
  );
}
