import { NavLink } from "react-router";
import type { Hero } from "~/services/heroService";
import HeroInfo from "./HeroInfo";
import { cn } from "~/lib/utils";

interface HeroCardProps {
  hero: Hero;
}

export default function HeroCard({ hero }: HeroCardProps) {
  return (
    <NavLink
      to={`/heroes/${hero.id}`}
      className={({ isActive }) => cn(
        "p-2 border-2 rounded ",
        isActive ? "border-blue-800 shadow-lg pointer-events-none" : "border-gray-200 hover:border-blue-400"
      )}
    >
      <HeroInfo hero={hero} />
    </NavLink>
  );
}