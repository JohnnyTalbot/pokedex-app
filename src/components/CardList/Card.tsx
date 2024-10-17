import Link from "next/link"

export default function Card( {pokemon, isListView} : any ){
  const id = pokemon.url.split('/').filter(Boolean).pop();
  const capturedStatus = localStorage.getItem(`capturedStatus-${id}`);
  const getNickname = localStorage.getItem(`nickname-${id}`) || '';
  const getCapturedDate = localStorage.getItem(`capturedDate-${id}`) || '';

  return(
      isListView ? 
      <Link
        className="flex mb-10 p-8 border border-gray-300 rounded gap-32"
        href={`/pokemon/${id}`}>
        <div className="flex flex-col">
          <h2>#{id.toString().padStart(3, '0')}</h2>
          <img 
            className="w-32"
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
            alt={pokemon.name} />
        </div>
        <div>
          <h1>{pokemon.name}</h1>
          <h2>Nickname: {getNickname}</h2>
          <h2>Date: {getCapturedDate}</h2>
        </div>
      </Link>
      :
      <Link
      className="flex flex-col mb-4 p-2 border border-gray-300 rounded justify-center items-center"
      href={`/pokemon/${id}`}>
      <h2>#{id.toString().padStart(3, '0')}</h2>
      <img 
        className="w-full"
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
        alt={pokemon.name} />
      <h1 className="text-center">{pokemon.name}</h1>
    </Link>
  )
}