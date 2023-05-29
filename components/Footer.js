import ThemeSwitch from './ThemeSwitch';
const Footer = () => {
  return (
    <footer className='mt-20 mb-10'>
      <div className='max-w-7xl flex justify-between items-center space-x-5 mx-auto mt-10 py-4'>
        <p className=' dark:text-slate-500 text-slate-500 text-sm'>
          &copy; {new Date().getFullYear()} All Rights Reserved.
        </p>
        <ThemeSwitch />
      </div>
    </footer>
  );
};

export default Footer;
