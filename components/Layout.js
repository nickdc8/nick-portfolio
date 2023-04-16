import Nav from './Nav';
import Footer from './Footer';

export default function RootLayout({ children }) {
  return (
    <div className='flex flex-col min-h-screen max-w-screen-xl mx-auto px-4'>
      <Nav />
      <main className='flex-1'>{children}</main>
      <Footer />
    </div>
  );
}
