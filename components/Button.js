import Link from 'next/link';

function Button({ href }) {
  return (
    <Link href={href} legacyBehavior>
      <a
        className='mt-4 inline-block border-2 border-gray-500 rounded-full text-sm py-2 px-4 text-gray-800 dark:text-gray-100 hover:text-white hover:bg-gray-600 transition-colors duration-300'
        target='_blank'
      >
        Visit Website
      </a>
    </Link>
  );
}

export default Button;
