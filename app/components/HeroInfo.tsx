import { useState } from "react";
import type { Hero } from "~/services/heroService";
import UserIcon from "./icons/User";
import { cn } from "~/lib/utils";

interface HeroInfoProps {
  hero: Hero ;
}

export default function HeroInfo(props: HeroInfoProps) {
  const { hero } = props;
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const showImage = !!hero.image && !imageError;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-40 h-40">
        <UserIcon className="w-40 h-40 text-slate-400" />
        {showImage ? (
          <img
            src={hero.image}
            alt={hero.name}
            className={cn("absolute inset-0 w-40 h-40 object-cover opacity-0", {
              "opacity-100": imageLoaded
            })}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
          />
        ) : null}
      </div>
      <p className="font-bold">{hero.name}</p>
    </div>
  );
}
