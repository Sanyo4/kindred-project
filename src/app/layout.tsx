import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Kindred — Bedtime Stories Together',
  description: 'A bedtime storytelling app for work-separated families',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-bg-dark text-muted-gold antialiased">
        {children}
      </body>
    </html>
  );
}
