import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: 'Day Weaver',
  description: 'Plan your day with the power of AI',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4407667957128270"
     crossOrigin="anonymous"></script>
        <script async custom-element="amp-auto-ads"
        src="https://cdn.ampproject.org/v0/amp-auto-ads-0.1.js">
</script>
      </head>
      <body className={cn("font-body antialiased", "min-h-screen bg-background font-sans")}>
        <amp-auto-ads type="adsense"
          data-ad-client="ca-pub-4407667957128270">
        </amp-auto-ads>
        {children}
        <Toaster />
        <script type='text/javascript' src='//pl27721408.revenuecpmgate.com/5e/f8/6d/5ef86db68262f97a748ace5ea1c9ee88.js'></script>
      </body>
    </html>
  );
}
