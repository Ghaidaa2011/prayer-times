import { Stack } from "@mui/material";
import PrayerCard from "./PrayerCard";
import { ITimings } from "../types/timings.types";
import { memo } from "react";
interface MainProps {
  timings: ITimings;
}
const Main = memo(({ timings }: MainProps) => {
  return (
    <Stack
      sx={{
        direction: "ltr",
        margin: "5vh 0px",
      }}
      direction="row-reverse"
      spacing={1}
      flexWrap="wrap"
      justifyContent={"space-around"}
    >
      <PrayerCard
        name="الفجر"
        time={timings?.Fajr}
        image="https://img.freepik.com/premium-photo/person-reflecting-preparing-spiritually-before-start-ramadan_1314467-208990.jpg?w=826"
      />
      <PrayerCard
        name="الشروق"
        time={timings?.Sunrise}
        image="https://img.freepik.com/premium-photo/tranquil-mosque-scene-with-soft-lighting-worshippers-prayer_1314467-208529.jpg?w=826"
      />
      <PrayerCard
        name="الظهر"
        time={timings?.Dhuhr}
        image="https://img.freepik.com/premium-photo/peaceful-contemplative-setting-person-fasting-day_1314467-207873.jpg?w=826"
      />
      <PrayerCard
        name="العصر"
        time={timings?.Asr}
        image="https://img.freepik.com/premium-photo/person-meditating-praying-serene-setting-ramadan_1314467-211536.jpg?w=826"
      />
      <PrayerCard
        name="المغرب"
        time={timings?.Maghrib}
        image="https://img.freepik.com/premium-photo/person-performing-fajr-prayer-with-tranquil-sunrise-background_1314467-209326.jpg"
      />
      <PrayerCard
        name="العشاء"
        time={timings?.Isha}
        image="https://img.freepik.com/premium-photo/person-reflecting-preparing-spiritually-before-start-ramadan_1314467-209123.jpg?w=826"
      />
    </Stack>
  );
});
export default Main;
