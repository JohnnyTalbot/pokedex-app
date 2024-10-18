import ThemeToggle from '@/components/ThemeToggle';
import Link from 'next/link';

export default function Header(props: any){
  return(
    <div className="px-5 sm:px-10 md:px-16 lg:px-18 xl:px-24 py-5 flex flex-col text-sm md:text-xl xl:text-2xl">
      <div className='flex justify-between'>
        {
        props.hasBack ? 
        <Link href="/" className='flex items-center'>
          <p>&lt; Go Back</p>
        </Link>
        : <div></div>
        }
        <h1 className='text-xl lg:text-4xl text-center'>{props.pageName}</h1>
        <ThemeToggle />
      </div>
      <div className='flex justify-between flex-col md:flex-row mt-2'>
        {props.children}
      </div>
    </div>
  )
}