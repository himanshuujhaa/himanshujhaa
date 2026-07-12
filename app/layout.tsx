import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Himanshu Jha | Software Engineer",
  description: "Software Engineer specializing in Java, Spring Boot, AI integration, and modern web applications.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            (function() {
              try {
                var savedTheme = localStorage.getItem('theme');
                var systemPreferDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                var shouldBeDark = savedTheme ? savedTheme === 'dark' : systemPreferDark;
                if(shouldBeDark) {
                  document.documentElement.classList.add('dark');
                }
                else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (e) {
                // Ignore error
              }
            })()`,
          }}
        />
      </head>
      <body className={`${inter.variable} ${inter.className} min-h-screen flex flex-col antialiased selection:bg-blue-500 selection:text-white`}>
        <Navbar />
        <div className="flex-1 relative z-10">
          {children}
        </div>
        <footer className="border-t border-slate-200 dark:border-slate-800/80 py-8 text-center text-sm text-slate-500 dark:text-slate-400 relative z-10 bg-slate-50/50 dark:bg-slate-950/50 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p>© {new Date().getFullYear()} Himanshu Jha. All rights reserved.</p>
            <div className="flex items-center space-x-6">
              <a href="https://github.com/himanshuujhaa" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors">GitHub</a>
              <a href="https://www.linkedin.com/in/himanshujhaa/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors">LinkedIn</a>
              <a href="mailto:himanshuprincejha2001@gmail.com" className="hover:text-blue-500 transition-colors">Contact</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}