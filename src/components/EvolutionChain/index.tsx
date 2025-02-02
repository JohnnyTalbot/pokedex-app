import { useQuery } from '@tanstack/react-query';

import { FaLongArrowAltDown } from 'react-icons/fa';
import EvolutionCircle from './EvolutionCircle';
import Loading from '@/components/Loading';

interface EvolutionChainProps {
  url: string;
}

interface Species {
  name: string;
  url: string;
}

interface Chain {
  evolution_details: [];
  evolves_to: [];
  species: Species;
}

async function getEvolutionChainData(url: string){
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Failed to fetch Evolution Chain');
  }
  return res.json();
}

export default function EvolutionChain({url} : EvolutionChainProps) {
  const { data: EvolutionData, error: error, isLoading: isLoading } = useQuery({
    queryKey: ['pokemonEvolution'],
    queryFn: () => getEvolutionChainData(url as string),
    enabled: !!url,
  });

  if (isLoading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;

  // Recursively retrieving each pokemon evolution as a list of elements
  const getEvolutionChain = (chain: any): JSX.Element[] => {
    if (!chain) return [];

    const evolutions: JSX.Element[] = [];
    const id = chain.species.url.split('/').filter(Boolean).pop();
    evolutions.push(
      <EvolutionCircle key={id} id={id} name={chain.species.name} />
    );

    if (chain.evolves_to.length !== 0) {
      evolutions.push(
        <FaLongArrowAltDown key={`${chain.species.name}-arrow`} className="my-2" />
      );
      evolutions.push(...getEvolutionChain(chain.evolves_to[0]));
    }
  
    return evolutions;
  }

  return(
    <div className="flex flex-col justify-center items-center">
      {
        getEvolutionChain(EvolutionData.chain)
      }
    </div>
  )
} 