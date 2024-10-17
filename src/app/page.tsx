'use client';

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import { FaList } from 'react-icons/fa';
import { BsFillGridFill } from 'react-icons/bs';
import CardList from '@/components/CardList';
import SearchBox from '@/components/SearchBox';

async function getAllPokemon(){
  const res = await fetch(
    "https://pokeapi.co/api/v2/pokemon/?limit=150&offset=0",
    { cache: 'no-store' }
  );
  if (!res.ok) {
    throw new Error('Failed to fetch Pokémon');
  }
  return res.json();
}

export default function Home() {
  const { data, error, isLoading } = useQuery({
    queryKey: ['allPokemon'],
    queryFn: getAllPokemon,
  });

  const [isListView, setIsListView] = useState(false);
  const [isCapturedView, setIsCapturedView] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [displayedPokemon, setDisplayedPokemon] = useState<any[]>([]);
  const [allPokemon, setAllPokemon] = useState<any[]>([]);
  const [filteredPokemon, setFilteredPokemon] = useState(allPokemon);
  const [offset, setOffset] = useState(0);
  const LIMIT = 10;

  useEffect(() => {
    if (data?.results) {
      setAllPokemon(data.results);
      setDisplayedPokemon(data.results.slice(0, LIMIT));
    }
  }, [data]);

  // FILTER FOR SEARCH AND CAPTURED
  useEffect(() => {
    const newFilteredPokemon = allPokemon.filter((p: any) => {
      let id = p.url.split('/').filter(Boolean).pop();
      if(isCapturedView){
        return p.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
        localStorage.getItem(`capturedStatus-${id}`) === 'true'
      }
      else{
        return p.name.toLowerCase().includes(searchTerm.toLowerCase())
      }
    }
    );
    setOffset(0);
    setFilteredPokemon(newFilteredPokemon);
    setDisplayedPokemon(newFilteredPokemon.slice(0, LIMIT));
  }, [allPokemon, searchTerm, isCapturedView])

  const loadMore = () => {
    const newOffset = offset + LIMIT;
    const newPokemon = filteredPokemon.slice(newOffset, newOffset + LIMIT);
    setDisplayedPokemon(prev => [...prev, ...newPokemon]);
    setOffset(newOffset);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>

      <header className="w-full px-28 fixed flex flex-col left-0 right-0 top-0">
        <h1 className='text-center'>Pokedex</h1>
        <div className='flex justify-between'>
          <SearchBox
          placeholder="Search Pokemon..."
          onChangeHandler={(e: any) => setSearchTerm(e.target.value)}
          />
          <div className='flex gap-5 text-3xl items-center'>
            <button onClick={() => setIsListView(true)}><FaList/></button>
            <button onClick={() => setIsListView(false)}><BsFillGridFill/></button>
          </div>
        </div>
      </header>

      <main className='px-28 py-20'>
        <div className="flex flex-col justify-center">

          <CardList
            items={displayedPokemon}
            isListView={isListView}
          />

          {displayedPokemon.length < filteredPokemon.length && (
            <button
              onClick={loadMore}
              className="mt-4 p-2 bg-blue-500 text-white rounded"
            >
              Load More
            </button>
          )}
        </div>
      </main>

      <footer className="w-full px-28 fixed flex justify-around left-0 right-0 bottom-0">
        <button onClick={() => setIsCapturedView(false)}>All</button>
        <button onClick={() => setIsCapturedView(true)}>Captured</button>
      </footer>
    </div>
  );
}
