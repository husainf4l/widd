import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WIDD.AI - Ethical Sports Intelligence Platform",
  description:
    "WIDD.AI is an ethical sports intelligence platform that fuses cutting-edge AI with the soul of the game. Born in Saudi Arabia, built for athletes, coaches, and fans who believe performance is about more than numbers—it's about heart.",
  keywords:
    "sports analytics, AI, Saudi Arabia, sports intelligence, sports data",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background`}
      >
        <Header />
        <main>{children}</main>
        <footer className="bg-primary text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="space-y-4">
                <h3 className="text-xl font-bold">WIDD.AI</h3>
                <p className="text-white/80">
                  An ethical sports intelligence platform that fuses
                  cutting-edge AI with the soul of the game.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-4">Product</h4>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="#features"
                      className="text-white/80 hover:text-secondary transition-colors"
                    >
                      Features
                    </a>
                  </li>
                  <li>
                    <a
                      href="#demo"
                      className="text-white/80 hover:text-secondary transition-colors"
                    >
                      Demo
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-white/80 hover:text-secondary transition-colors"
                    >
                      Pricing
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-4">Company</h4>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="#"
                      className="text-white/80 hover:text-secondary transition-colors"
                    >
                      About
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-white/80 hover:text-secondary transition-colors"
                    >
                      Team
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-white/80 hover:text-secondary transition-colors"
                    >
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-4">Legal</h4>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="#"
                      className="text-white/80 hover:text-secondary transition-colors"
                    >
                      Privacy
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-white/80 hover:text-secondary transition-colors"
                    >
                      Terms
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-white/80 hover:text-secondary transition-colors"
                    >
                      Ethics
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-12 pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-center">
              <div className="text-white/60 text-sm">
                © 2025 WIDD.AI. All rights reserved. Proudly made in Saudi
                Arabia.
              </div>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a
                  href="#"
                  className="text-white/80 hover:text-secondary transition-colors"
                >
                  Twitter
                </a>
                <a
                  href="#"
                  className="text-white/80 hover:text-secondary transition-colors"
                >
                  LinkedIn
                </a>
                <a
                  href="#"
                  className="text-white/80 hover:text-secondary transition-colors"
                >
                  Instagram
                </a>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
