import ThemeToggle from '@/components/theme-toggle';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import ThemeProvider from '@/providers/theme';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Pokedex',
  description: 'Pokemon data',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <main className="min-h-screen bg-slate-200 dark:bg-gray-600 px-4 py-4 md:px-24 md:py-12">
            <section className="flex justify-end mb-4">
              <ThemeToggle />
            </section>
            <section className="flex flex-col items-center justify-center">
              {children}
            </section>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
