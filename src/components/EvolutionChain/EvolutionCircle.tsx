import styles from "./EvolutionChain.module.css";

import Link from "next/link";

interface EvolutionCircleProps{
  id: string;
  name: string;
}

export default function EvolutionCircle({id, name} : EvolutionCircleProps) {
  return(
    <Link 
      className="relative min-w-36 p-3 border rounded-full border-gray-900 dark:border-gray-200" 
      href={`/pokemon/${id}`}>
      <div className={`w-full flex flex-col items-center evolution-image ${styles.evoContainer}`}>
        <img 
        className="w-full"
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
        alt={name} />
        <p className={styles.evoName}>{name}</p>
      </div>
    </Link>
  )
}