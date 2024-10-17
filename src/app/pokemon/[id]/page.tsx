'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';

async function getPokemonData(id: string){
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
  if (!res.ok) {
    throw new Error('Failed to fetch Pokémon details');
  }
  return res.json();
}

export default function PokemonPage() {
  const params = useParams();
  const id = params?.id;
  const { data, error, isLoading } = useQuery({
    queryKey: ['pokemon', id],
    queryFn: () => getPokemonData(id as string),
    enabled: !!id, 
  });

  const [isCaptured, setIsCaptured] = useState(false);
  const [nickname, setNickname] = useState('');
  const [capturedDate, setCapturedDate] = useState('');

  useEffect(() => {
    const capturedStatus = localStorage.getItem(`capturedStatus-${id}`);
    const getNickname = localStorage.getItem(`nickname-${id}`) || '';
    const getCapturedDate = localStorage.getItem(`capturedDate-${id}`) || '';
    if(capturedStatus === 'true'){
      setIsCaptured(true);
      setNickname(getNickname);
      setCapturedDate(getCapturedDate)
      }
  }, [id])

  const handleCapture = () => {
    setIsCaptured(true);
    localStorage.setItem(`capturedStatus-${id}`, 'true');
    localStorage.setItem(`nickname-${id}`, nickname);
    localStorage.setItem(`capturedDate-${id}`, capturedDate);
  }

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return(
    <div>
      <h1>{data.name}</h1>
      <p>Height: {data.height}</p>
      <p>Weight: {data.weight}</p>
      <img src={data.sprites.front_default} alt={data.name} />
      <div className="flex flex-col border border-white w-56 justify-content-center">
        <h2>Status:</h2>
        {isCaptured ? (
          <div>
            <p>Captured!</p>
            <p>{nickname}</p>
            <p>{capturedDate}</p>
          </div>
        ) : (
          <div>
            <input type="text" placeholder="Enter Nickname" onChange={(e) => setNickname(e.target.value)} />
            <input type="date" onChange={(e) => setCapturedDate(e.target.value)}/>
            <button onClick={handleCapture}>Tag Captured</button>
          </div>
        )}
      </div>
    </div>
  )
}