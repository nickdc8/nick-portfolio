import Link from 'next/link';

function Button({ href }) {
  return (
    <Link href={href} legacyBehavior>
      <a
        className='mt-4 inline-block border-2 border-slate-500 rounded-full text-sm py-2 px-4 text-slate-800 dark:text-slate-100 hover:text-white hover:bg-slate-600 transition-colors duration-300'
        target='_blank'
      >
        Visit Website
      </a>
    </Link>
  );
}

export default Button;
