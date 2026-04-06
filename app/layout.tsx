import type {Metadata} from 'next';
import { JetBrains_Mono } from 'next/font/google';
import './globals.css'; // Global styles

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'M. Hamza Javed | Terminal',
  description: 'Personal Portfolio of M. Hamza Javed - React Frontend Developer',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${jetbrainsMono.variable}`}>
      <body className="min-h-screen antialiased selection:bg-primary selection:text-primary-foreground relative" suppressHydrationWarning>
        <div className="pointer-events-none fixed inset-0 z-50 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] opacity-20"></div>
        {children}
      </body>
    </html>
  );
}
