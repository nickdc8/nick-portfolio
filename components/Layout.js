import Nav from './Nav';
import Footer from './Footer';
import { Work_Sans } from 'next/font/google';

const inter = Work_Sans({
  subsets: ['latin'],
  variable: '--font-inter',
});

export default function RootLayout({ children }) {
  return (
    <div
      className={`${inter.variable} font-sans flex flex-col min-h-screen max-w-7xl mx-auto px-4`}
    >
      <Nav />
      <main className='flex-1'>{children}</main>
      <Footer />
    </div>
  );
}
