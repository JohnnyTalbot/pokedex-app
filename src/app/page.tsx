'use client';

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import { FaList } from 'react-icons/fa';
import { BsFillGridFill } from 'react-icons/bs';
import CardList from '@/components/CardList';
import SearchBox from '@/components/SearchBox';
import Header from '@/components/Header';
import Loading from '@/components/Loading';

async function getAllPokemon(){
  const res = await fetch(
    "https://pokeapi.co/api/v2/pokemon/?limit=150&offset=0",
    { cache: 'no-store' }
  );
  if (!res.ok) {
    throw new Error('Failed to fetch Pokemon');
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

  if (isLoading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="h-full min-h-screen text-gray-900 dark:text-gray-300 bg-gray-200 dark:bg-gray-900 transition-colors duration-300">
      <Header pageName="Pokédex" hasBack={false}>
          <SearchBox
          placeholder="Search Pokemon..."
          onChangeHandler={(e: any) => setSearchTerm(e.target.value)}
          />
          <div className='flex gap-5 text-3xl items-center'>
            <button onClick={() => setIsListView(true)}><FaList/></button>
            <button onClick={() => setIsListView(false)}><BsFillGridFill/></button>
          </div>
      </Header>
      <main className='px-5 sm:px-10 md:px-16 lg:px-18 xl:px-24 pb-32'>
        <div className="flex flex-col justify-center items-center w-full">

          <CardList
            items={displayedPokemon}
            isListView={isListView}
          />

          {displayedPokemon.length < filteredPokemon.length && (
            <button
              onClick={loadMore}
              className="mt-4 p-2 bg-blue-500 text-white rounded w-48"
            >
              Load More
            </button>
          )}
        </div>
      </main>

      <footer className="w-full fixed flex left-0 right-0 bottom-0">
        <div
          className={`flex-1 cursor-pointer flex justify-center p-5 ${
            !isCapturedView ? 'bg-blue-500 text-white' : 'bg-gray-300 dark:bg-gray-700 text-black dark:text-white'
          }`}
          onClick={() => setIsCapturedView(false)}
        >
          <p>All</p>
        </div>
        <div
          className={`flex-1 cursor-pointer flex justify-center p-5 ${
            isCapturedView ? 'bg-blue-500 text-white' : 'bg-gray-300 dark:bg-gray-700 text-black dark:text-white'
          }`}
          onClick={() => setIsCapturedView(true)}
        >
          <p>Captured</p>
        </div>
      </footer>
    </div>
  );
}
