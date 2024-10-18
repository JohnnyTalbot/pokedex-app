'use client';

import { useState, useEffect } from 'react';
import { FaMoon } from 'react-icons/fa';
import { BsSunFill } from 'react-icons/bs';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<string | null>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    } else {
      setTheme(systemPrefersDark ? 'dark' : 'light');
      document.documentElement.classList.toggle('dark', systemPrefersDark);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  return (
      <div
        onClick={toggleTheme}
        className='relative w-16 h-8 flex items-center dark:bg-gray-800 bg-teal-500 cursor-pointer rounded-full p-1'
        >
        <BsSunFill className="text-yellow-400" size={18}/>
        <div 
        className='absolute bg-white dark:bg-gray-600 w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ease-in-out'
        style={{ transform: theme === 'dark' ? 'translateX(0)' : 'translateX(32px)' }}
        ></div>
        <FaMoon className="ml-auto text-gray-300" size={18}/>
      </div>
  );
}
