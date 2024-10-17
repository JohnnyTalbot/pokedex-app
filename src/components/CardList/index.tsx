import Card from "@/components/CardList/Card";

export default function CardList( {items, isListView} : any){
  const viewStyle = isListView ? "flex flex-col" : "grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-16";
  return(
    <div className={viewStyle}>
      {items?.map((p: any) => {
        return <Card key={p.name} pokemon={p} isListView={isListView}/>
      })}
    </div>
  )
}