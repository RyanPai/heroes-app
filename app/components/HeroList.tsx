import type { Hero } from "~/services/heroService";
import HeroCard from "./HeroCard";

interface HeroListProps {
  heroes: Hero[];
}

export default function HeroList({ heroes }: HeroListProps) {

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 justify-center gap-4 p-4 border rounded-lg">
      {
        !heroes.length && (
          <p className="col-span-full text-center py-10"> 英雄列表無資料</p>
        )
      }
      {heroes.map((hero) => (
        <HeroCard
          key={hero.id}
          hero={hero}
        />
      ))}
    </div>
  );
}