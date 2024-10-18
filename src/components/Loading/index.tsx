import Image from 'next/image';
import LoadingGif from '../../../public/pokemon-pikachu.gif';

export default function Loading() {
  return(
    <div className='h-screen flex flex-col justify-center items-center gap-5'>
      <Image src={LoadingGif} alt="Pikachu Loading" width={150} height={150} />
      <p>Loading...</p>
    </div>
  );
}
