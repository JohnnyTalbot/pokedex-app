'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';

import Header from '@/components/Header';
import Loading from '@/components/Loading';

import InformationBox from '@/components/InformationBox';
import EvolutionChain from '@/components/EvolutionChain';

async function getPokemonData(id: string){
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
  if (!res.ok) {
    throw new Error('Failed to fetch Pokemon details');
  }
  return res.json();
}

async function getSpeciesData(id: string){
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}/`);
  if (!res.ok) {
    throw new Error('Failed to fetch Species details');
  }
  return res.json();
}

export default function PokemonPage() {
  const params = useParams();
  const id = params?.id;
  const { data: pokemonData, error: pokemonError, isLoading: isLoadingPokemon } = useQuery({
    queryKey: ['pokemon', id],
    queryFn: () => getPokemonData(id as string),
    enabled: !!id,
  });

  const { data: speciesData, error: speciesError, isLoading: isLoadingSpecies } = useQuery({
    queryKey: ['species', id],
    queryFn: () => getSpeciesData(id as string),
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

  if (isLoadingPokemon || isLoadingSpecies) return <Loading />;
  if (pokemonError) return <div>Error: {pokemonError.message}</div>;
  if (speciesError) return <div>Error: {speciesError.message}</div>;

  return(
    <div className="h-full min-h-screen text-gray-900 dark:text-gray-300 bg-gray-200 dark:bg-gray-900 transition-colors duration-300">
      <Header hasBack={true} />

      <div className='h-full flex flex-col items-center'>
        <div className='flex flex-col items-center border border-gray-900 dark:border-gray-200 rounded p-3'>
          <h2>#{id.toString().padStart(3, '0')}</h2>
          <img 
            className='w-48'
            src={pokemonData.sprites.front_default}
            alt={pokemonData.name} />
          <h1 className='text-lg'>{pokemonData.name}</h1>
          <p className='text-s' style={{color: speciesData.color.name}}>
            {speciesData.genera.find((t: any) => t.language.name == "en").genus}
          </p>
          <p className='text-xs'>Height: {pokemonData.height/10} m</p>
          <p className='text-xs'>Weight: {pokemonData.weight/10} kg</p>
        </div>
        <div className='max-w-2xl flex gap-3 border border-gray-900 dark:border-gray-200 rounded p-3 my-5 mx-2'>
          <InformationBox 
          text_entries={speciesData.flavor_text_entries}
          types={pokemonData.types}
          abilities={pokemonData.abilities}
          stats={pokemonData.stats} />

          <EvolutionChain url={speciesData.evolution_chain.url} />

        </div>
        
        <div className="flex flex-col border border-gray-900 dark:border-gray-200 rounded justify-center p-3 mx-2">
          <h2>Status:</h2>
          {isCaptured ? (
            <div className='flex flex-col gap-2'>
              <p className="text-green-600 dark:text-green-400">Captured!</p>
              <p>Nickname: {nickname}</p>
              <p>Date: {capturedDate}</p>
            </div>
          ) : (
            <div className='flex flex-col gap-2'>
              <input 
                className='p-2 text-gray-900 border border-gray-300 rounded'
                type="text" placeholder="Enter Nickname"
                onChange={(e) => setNickname(e.target.value)} />
              <input 
                className='p-2 text-gray-900 border border-gray-300 rounded'
                type="date"
                onChange={(e) => setCapturedDate(e.target.value)}/>
              <button className="p-2 bg-blue-500 text-white rounded" onClick={handleCapture}>Tag Captured</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}