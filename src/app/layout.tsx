import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Day Weaver - AI-Powered Daily Schedule Optimizer',
  description: 'Plan your day, manage your tasks, and optimize your schedule with the power of AI. Day Weaver helps you build a productive and balanced daily routine.',
  keywords: ['daily planner', 'schedule optimizer', 'AI assistant', 'task management', 'productivity app'],
  authors: [{ name: 'Day Weaver Team' }],
  robots: 'index, follow',
  openGraph: {
    title: 'Day Weaver - AI-Powered Daily Schedule Optimizer',
    description: 'Optimize your daily tasks and boost productivity with Day Weaver.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4407667957128270"
     crossOrigin="anonymous"></script>
        <script async custom-element="amp-auto-ads"
        src="https://cdn.ampproject.org/v0/amp-auto-ads-0.1.js">
</script>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
      </head>
      <body className={cn("font-body antialiased", "min-h-screen bg-background font-sans flex flex-col")}>
        <amp-auto-ads type="adsense"
          data-ad-client="ca-pub-4407667957128270">
        </amp-auto-ads>
        <div className="flex-grow">
          {children}
        </div>
        <footer className="border-t py-6">
          <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Day Weaver. All rights reserved.</p>
            <nav className="flex gap-4 mt-4 md:mt-0">
              <Link href="/about" className="hover:text-foreground">About Us</Link>
              <Link href="/contact" className="hover:text-foreground">Contact</Link>
              <Link href="/privacy" className="hover:text-foreground">Privacy Policy</Link>
            </nav>
          </div>
        </footer>
        <Toaster />
      </body>
    </html>
  );
}
