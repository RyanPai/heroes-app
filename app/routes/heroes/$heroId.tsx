import { useParams } from "react-router";
import { getProfile, getHero } from "~/services/heroService";
import type { Route } from "./+types/$heroId";
import HeroInfo from "~/components/HeroInfo";
import HeroProfile from "~/components/HeroProfile";
import ErrorFallback from "~/components/ErrorFallback";
import type { ApiErrorShape } from "~/services/api";

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const [heroResult, profileResult] = await Promise.allSettled([
    getHero(params.heroId!),
    getProfile(params.heroId!)
  ]);
   
  const hero = heroResult.status === "fulfilled" 
  ? heroResult.value 
  : null; 

  const profile = profileResult.status === "fulfilled" 
    ? profileResult.value 
    : null;

   const heroError =
    heroResult.status === "rejected"
      ? (heroResult.reason as ApiErrorShape)
      : null;
  const profileError =
    profileResult.status === "rejected"
      ? (profileResult.reason as ApiErrorShape)
      : null;
  const isNotFound =
    (heroError && heroError.status === 404) &&
    (profileError && profileError.status === 404); 

  return { hero, profile, isNotFound };
}

export const meta: Route.MetaFunction = ({ loaderData }) => {
  if (!loaderData || !loaderData.hero) return [{ title: "英雄詳細資訊" }];
  const { hero } = loaderData;

  return [
    { title: `${hero.name || ''} - 英雄詳細資訊` },
    { name: "description", content: `${hero.name} - 英雄詳細資訊` }
  ];
};

export default function HeroProfilePage({ loaderData }: Route.ComponentProps) {
  const { heroId } = useParams<{ heroId: string }>();
  const { hero, profile, isNotFound } = loaderData;


  if (isNotFound) {
    return (
      <div className="flex items-center justify-center p-10 rounded-lg border flex-1">
        <p>⚠️ 英雄不存在，請重新選擇</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-2 md:flex-row">
      <section className="flex items-center justify-center p-4 rounded-lg border flex-1">
        {hero ? (
          <div>
            <p className="text-lg font-semibold text-center">目前英雄</p>
            <HeroInfo key={heroId} hero={hero} />
          </div>
        ) : ( 
          <ErrorFallback message={"⚠️ 暫時無法取得資訊"} />
        )}
      </section>
      <section className="flex items-center justify-center p-4 rounded-lg border flex-1">
        {profile && heroId ? (
          <HeroProfile key={heroId} initialProfile={profile} heroId={heroId} />
        ) : (
          <ErrorFallback message={"⚠️ 暫時無法取得能力值"} />
        )}  
      </section>
  </div>
  );
}
