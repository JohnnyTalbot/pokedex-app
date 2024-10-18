import Link from "next/link"
import { FaCheck, FaWindowClose } from 'react-icons/fa';

export default function Card( {pokemon, isListView} : any ){
  const id = pokemon.url.split('/').filter(Boolean).pop();
  const capturedStatus = localStorage.getItem(`capturedStatus-${id}`);
  const getNickname = localStorage.getItem(`nickname-${id}`) || '';
  const getCapturedDate = localStorage.getItem(`capturedDate-${id}`) || '';

  return(
      isListView ? 
      <Link
        className="flex mb-10 p-6 border border-gray-300 rounded md:gap-10 lg:gap-24 text-gray-900 text-sm md:text-xl lg:text-3xl xl:text-4xl"
        style={capturedStatus === 'true' ? {backgroundColor: "#BAE05F"} : {backgroundColor: "#DA7589"}}
        href={`/pokemon/${id}`}>
        <div className="flex flex-col text-base">
          <h3>#{id.toString().padStart(3, '0')}</h3>
          <img 
            className="w-44"
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
            alt={pokemon.name} />
        </div>
        <div className="flex flex-col justify-between py-5">
          <h2>{pokemon.name}</h2>
          <h4>Nickname: {getNickname}</h4>
          <h4>Date: {getCapturedDate}</h4>
        </div>
        <div className="align-middle text-4xl md:text-6xl lg:text-8xl ml-auto mt-auto mb-auto">
          {
            capturedStatus === 'true' ? 
            <FaCheck /> :
            <FaWindowClose />
          }
        </div>
        
        
      </Link>
      :
      <Link
        className="flex flex-col mb-4 p-2 border border-gray-300 rounded justify-center items-center text-gray-900"
        style={capturedStatus === 'true' ? {backgroundColor: "#BAE05F"} : {backgroundColor: "#DA7589"}}
        href={`/pokemon/${id}`}>
        <p>#{id.toString().padStart(3, '0')}</p>
        <img 
          className="w-full"
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
          alt={pokemon.name} />
        <p className="text-center">{pokemon.name}</p>
      </Link>
  )
}