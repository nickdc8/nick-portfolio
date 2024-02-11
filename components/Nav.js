import Link from 'next/link';
import { useRouter } from 'next/router';

const Nav = () => {
  const router = useRouter();

  return (
    <nav>
      <div className='mx-auto mt-10 '>
        <div className='flex justify-between h-16'>
          <div className='flex-shrink-0 flex items-center'>
            <Link legacyBehavior href='/' passHref>
              <a className='text-5xl font-black text-gray-900 dark:text-white'>
                N
              </a>
            </Link>
          </div>
          <div className='flex'>
            <ul className='flex space-x-8 items-center'>
              <li>
                <Link
                  className={
                    router.pathname === '/'
                      ? 'dark:text-gray-100 text-gray-800'
                      : 'text-gray-400 dark:text-gray-400 hover:text-gray-600'
                  }
                  href='/'
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  className={
                    router.pathname === '/[slug]'
                      ? 'dark:text-gray-100 text-gray-800'
                      : 'text-gray-400 dark:text-gray-400 hover:text-gray-600'
                  }
                  href='/about'
                >
                  About
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
