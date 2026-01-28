import type { STAT_KEYS } from "~/constants/hero";
import { api } from "./api";

export type HeroStatValue = typeof STAT_KEYS[number];
export interface Hero {
  id: string;
  name: string;
  image: string;
}

export type Profile = Record<HeroStatValue, number>;


export async function getHeroes(): Promise<Hero[]> {
  return api.get<Hero[]>("/heroes");
}

export async function getHero(id: string): Promise<Hero> {
  return api.get<Hero>(`/heroes/${id}`);
}

export async function getProfile(id: string): Promise<Profile> {
  return api.get<Profile>(`/heroes/${id}/profile`);
}

export async function updateProfile(id: string, profile: Profile): Promise<void> {
  return api.patch<void, Profile>(`/heroes/${id}/profile`, profile);
}