import type { Metadata } from "next";
import {
  Space_Grotesk,
  Plus_Jakarta_Sans,
  JetBrains_Mono,
  Noto_Sans_Bengali,
} from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ToastHost from "@/components/ToastHost";
import SocialWelcomeToast from "@/components/notifications/SocialWelcomeToast";
import ChatWidget from "@/components/chatbot/ChatWidget";
import { LanguageProvider } from "@/lib/i18n";
import { ProgressProvider } from "@/lib/progress";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["500", "600", "700"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600"],
  display: "swap",
});

const bengali = Noto_Sans_Bengali({
  subsets: ["bengali"],
  variable: "--font-bengali",
  weight: ["400", "500", "600", "700"],
  display: "swap",
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
    <html
      lang="en"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${plusJakarta.variable} ${jetbrainsMono.variable} ${bengali.variable}`}
    >
      <body className="antialiased selection:bg-[#00f5a0]/25 selection:text-white">
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
