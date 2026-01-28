import { STAT_KEYS } from "~/constants/hero";
import type { Profile } from "~/services/heroService";

export const calculateTotalStats = (p: Profile) => Object.values(p).reduce((acc, val) => acc + val, 0);

export const hasProfileChanged = (original: Profile, current: Profile): boolean => STAT_KEYS.some(key => original[key] !== current[key]);