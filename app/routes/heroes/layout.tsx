import HeroList from "~/components/HeroList";
import { Outlet, useLoaderData, type MetaFunction } from "react-router";
import { getHeroes } from "~/services/heroService";

export async function clientLoader() {
  try {
    const heroes = await getHeroes();
    return { heroes };
  } catch (error) {
    return { heroes: [], error: "⚠️ 英雄列表載入失敗，請稍後再試" };
  }
}

export const meta: MetaFunction = () => {
  return [
    { title: '英雄列表' },
    { name: "description", content: "英雄列表" }
  ];
};

export default function HeroesLayout() {
  const { heroes, error } = useLoaderData<typeof clientLoader>();

  return (
    <div className="flex flex-col gap-4">
      {error ? (
        <div className="rounded-lg border px-4 py-2 text-red-700  text-center">
          {error}
        </div>
      ) : <HeroList heroes={heroes} />}
      <Outlet />
    </div>
  );
}
