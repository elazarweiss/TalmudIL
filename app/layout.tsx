import type { Metadata } from 'next';
import { Frank_Ruhl_Libre, Assistant, Cormorant_Garamond } from 'next/font/google';
import './globals.css';

const frankRuhl = Frank_Ruhl_Libre({
  subsets: ['hebrew', 'latin'],
  weight: ['300', '400', '500', '700', '900'],
  variable: '--font-frank-ruhl',
  display: 'swap',
});

const assistant = Assistant({
  subsets: ['hebrew', 'latin'],
  weight: ['300', '400', '600', '700'],
  variable: '--font-assistant',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'תלמוד ישראל — הדיון החוקתי',
  description:
    'פלטפורמה דיגיטלית המארגנת את השיח החוקתי הישראלי במבנה של דף תלמוד',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="he"
      dir="rtl"
      className={`${frankRuhl.variable} ${assistant.variable} ${cormorant.variable}`}
    >
      <body className="min-h-screen bg-parchment-100 text-ink font-serif">
        {children}
      </body>
    </html>
  );
}
