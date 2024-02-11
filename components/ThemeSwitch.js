import { Fragment, useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Listbox, Transition } from '@headlessui/react';
import {
  HiCheck,
  HiOutlineMoon,
  HiOutlineSun,
  HiOutlineDesktopComputer,
} from 'react-icons/hi';

const options = [
  { id: 1, name: 'Dark', icon: <HiOutlineMoon className='h-5 w-5' /> },
  { id: 2, name: 'Light', icon: <HiOutlineSun className='h-5 w-5' /> },
  {
    id: 3,
    name: 'System',
    icon: <HiOutlineDesktopComputer className='h-5 w-5' />,
  },
];

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const [selected, setSelected] = useState(options[0]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (resolvedTheme === 'dark' || resolvedTheme === 'light') {
      setSelected(
        options.find((option) => option.name.toLowerCase() === resolvedTheme)
      );
    }
  }, [resolvedTheme]);

  const handleToggle = (selectedOption) => {
    setSelected(selectedOption);
    setTheme(selectedOption.name.toLowerCase());
  };

  if (!mounted) {
    return <div className='w-10 h-6 bg-gray-800 rounded animate-pulse' />;
  }

  return (
    <Listbox value={selected} onChange={handleToggle}>
      <div className='relative mt-1'>
        <Listbox.Button
          aria-label='Open Menu'
          className='relative w-[40px] cursor-pointer flex justify-center rounded-lg hover:bg-gray-200  dark:hover:bg-gray-900 py-2 focus:outline-none focus-visible:border-gray-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-300'
        >
          {selected.icon}
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave='transition ease-in duration-100'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <Listbox.Options
            className='absolute mt-1 max-h-60 w-[180px] overflow-auto rounded-md bg-white dark:bg-gray-900 py-1 text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none right-0'
            style={{ top: 'calc(-100% - 0.5rem - 80px)' }}
          >
            {options.map((option) => (
              <Listbox.Option
                key={option.id}
                className={({ active }) =>
                  `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-400'
                  }`
                }
                value={option}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`flex truncate ${
                        selected ? 'font-medium' : 'font-normal'
                      }`}
                    >
                      {option.icon && (
                        <span className='mr-2'>{option.icon}</span>
                      )}
                      {option.name}
                    </span>
                    {selected ? (
                      <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-gray-600'>
                        <HiCheck className='h-5 w-5' aria-hidden='true' />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};

export default ThemeSwitch;
