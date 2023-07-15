import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SearchHeader from "./components/SearchHeader";
import QueryClientContext from "./context/QueryClientContext";
import RecoilRootWrapper from "./context/RecoilRootWrapper";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Check world weather",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <RecoilRootWrapper>
          <QueryClientContext>
            <main>
              <SearchHeader />
              {children}
            </main>
          </QueryClientContext>
        </RecoilRootWrapper>
      </body>
    </html>
  );
}
