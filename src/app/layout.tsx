import type { Metadata } from "next";
import { Inter, Noto_Sans_Bengali } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ToastHost from "@/components/ToastHost";
import SocialWelcomeToast from "@/components/notifications/SocialWelcomeToast";
import ChatWidget from "@/components/chatbot/ChatWidget";
import { LanguageProvider } from "@/lib/i18n";
import { ProgressProvider } from "@/lib/progress";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const bengali = Noto_Sans_Bengali({
  subsets: ["bengali"],
  variable: "--font-bengali",
});

export const metadata: Metadata = {
  title: "CodePath — Zero-to-Hero CSE Career Roadmaps (বাংলা + English)",
  description:
    "Free step-by-step roadmaps for every CSE career, with simple explanations, free resources and projects. Available in Bangla and English.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${bengali.variable}`}>
      <body>
        <LanguageProvider>
          <ProgressProvider>
            <Navbar />
            <ToastHost />
            <SocialWelcomeToast />
            {children}
            <Footer />
            <ChatWidget />
          </ProgressProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
