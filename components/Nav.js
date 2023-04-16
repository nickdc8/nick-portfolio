import Link from 'next/link';
import { useRouter } from 'next/router';

const Nav = () => {
  const router = useRouter();

  return (
    <nav>
      <div className='max-w-7xl mx-auto mt-10 '>
        <div className='flex justify-between h-16'>
          <div className='flex-shrink-0 flex items-center'>
            <Link legacyBehavior href='/' passHref>
              <a className='text-5xl font-black dark:text-white'>N</a>
            </Link>
          </div>
          <div className='flex'>
            <ul className='flex space-x-8 items-center'>
              <li>
                <Link
                  className={
                    router.pathname === '/'
                      ? 'active'
                      : 'text-slate-800 dark:text-slate-100 hover:text-slate-400'
                  }
                  href='/'
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  className={
                    router.pathname === '/about'
                      ? 'active'
                      : 'text-slate-800 dark:text-slate-100 hover:text-slate-400'
                  }
                  href='/about'
                >
                  About
                </Link>
              </li>
              {/* <li>
                <Link legacyBehavior href='/contact' passHref>
                  <a
                    className={
                      router.pathname === '/contact'
                        ? 'active'
                        : 'text-slate-800 dark:text-slate-100 hover:text-slate-400'
                    }
                  >
                    Contact
                  </a>
                </Link>
              </li> */}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
