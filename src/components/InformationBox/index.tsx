interface TextEntry {
  flavor_text: string;
  language: {
    name: string;
  };
}

interface InformationBoxProps{
  text_entries: TextEntry[];
  types: [];
  abilities: [];
  stats: [];
}

export default function InformationBox({text_entries, types, abilities, stats} : InformationBoxProps){
  return(
    <div className='flex flex-col gap-3'>
            <div>
              <p>
                {text_entries.find((t: any) => t.language.name == "en")?.flavor_text || "No entry found"}
              </p>
            </div>
            <div>
              <p className='text-sm'>Type</p>
              <ul>
                {types?.map((type: any) => {
                  return <li key={type.type.name}>{type.type.name}</li>
                })}
              </ul>
            </div>
            <div>
              <p className='text-sm'>Abilities</p>
              <ul>
                {abilities?.map((ability: any) => {
                  return <li key={ability.ability.name}>{ability.ability.name}</li>
                })}
              </ul>
            </div>
            <div>
              <p className='text-sm'>Base Stats</p>
              <div className='grid grid-cols-3'>
                {stats?.map((stat: any) => {
                  return (
                  <div key={stat.stat.name}>
                    <p className='text-xs' style={{color: "#dc143c"}}>{stat.stat.name}</p>
                    <p>{stat.base_stat}</p>
                  </div>
                  )
                  })}
              </div>
              
            </div>
          </div>
  )
}