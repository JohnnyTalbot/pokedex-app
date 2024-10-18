import Card from "@/components/CardList/Card";

export default function CardList({ items, isListView }: any) {
  if (!items || items.length === 0) {
    return (
      <div className="flex justify-center items-center h-full w-full">
        <p className="text-center">No Pokemon Found!</p>
      </div>
    );
  }

  return (
    <div
      className={`${
        isListView
          ? "flex flex-col"
          : "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-5 md:gap-7 lg:gap-8 xl:gap-16"
      } h-full w-full`}
    >
      {items.map((p: any) => {
        return <Card key={p.name} pokemon={p} isListView={isListView} />;
      })}
    </div>
  );
}