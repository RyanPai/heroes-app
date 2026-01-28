import { useState } from "react";
import { STAT_KEYS } from "~/constants/hero";
import type { Profile } from "~/services/heroService";
import { updateProfile } from "~/services/heroService";
import { calculateTotalStats, hasProfileChanged } from "~/utils/hero";
import {useUnsavedChangesPrompt} from "~/hooks/useUnsavedChangesPrompt";
import Button from "./ui/Button";

interface HeroProfileProps {
  initialProfile: Profile;
  heroId: string;
}

export default function HeroProfile(props: HeroProfileProps) {
  const { initialProfile, heroId } = props;
  const [baseProfile, setBaseProfile] = useState<Profile>(initialProfile);
  const [profile, setProfile] = useState<Profile>(initialProfile);
  const [saving, setSaving] = useState(false);
  const stats = STAT_KEYS;
  const totalPoints = calculateTotalStats(initialProfile);
  const currentSum = calculateTotalStats(profile);
  const remainingPoints = totalPoints - currentSum;

  
  const isDirty = hasProfileChanged(profile, baseProfile);
  useUnsavedChangesPrompt(isDirty);

  const adjustStat = (stat: keyof Profile, delta: number) => {
    if (delta > 0 && remainingPoints <= 0) return;
    if (delta < 0 && profile[stat] <= 0) return;

    setProfile((prev) => ({
      ...prev,
      [stat]: prev[stat] + delta,
    }));
  };

  const handleSave = async () => {
    if (remainingPoints !== 0) {
      alert("剩餘點數尚未用完，請分配完畢後再儲存。");
      return;
    }

    setSaving(true);
    try {
      await updateProfile(heroId, profile);
      setBaseProfile(profile);
      alert("英雄能力值已成功更新！");
    } catch (err) {
      alert("更新失敗，請稍後再試。");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-4">
        {stats.map((stat) => (
          <div key={stat} className="flex items-center justify-between">
            <span className="text-lg font-medium uppercase w-12">{stat}</span>
            <div className="flex items-center gap-4">
              <Button
                color="secondary"
                onClick={() => adjustStat(stat, -1)}
                isIcon
                disabled={profile[stat] <= 0 || saving}
              >
                -
              </Button>
              <span className="text-xl font-bold w-8 text-center">{profile[stat]}</span>
              <Button
                onClick={() => adjustStat(stat, 1)}
                color="secondary"
                isIcon
                disabled={remainingPoints <= 0 || saving}
              >
                +
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center justify-between">
        <p className="text-lg font-semibold ">
          剩餘點數: <span className="text-blue-600">{remainingPoints}</span>
        </p>
        <Button
          onClick={handleSave}
          disabled={saving || remainingPoints !== 0}
          color="primary"
        >
          {saving ? "儲存中..." : "儲存"}
        </Button>
      </div>
    </div>
  );
}
