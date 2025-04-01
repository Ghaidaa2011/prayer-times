import moment from "moment";
import { useEffect, useState } from "react";
import { ITimings } from "../types/timings.types";

const useNextPrayerCounter = (timings: ITimings) => {
  const [nextPrayerName, setNextPrayerName] = useState("");
  const [timer, setTimer] = useState("00:00:00");

  useEffect(() => {
    if (!timings.Fajr) return; // Wait until timings are loaded
    const prayers = [
      {
        name: "الفجر",
        time: timings.Fajr,
        originalTime: moment(timings.Fajr, "h:mm A").format("HH:mm"),
      },
      {
        name: "الظهر",
        time: timings.Dhuhr,
        originalTime: moment(timings.Dhuhr, "h:mm A").format("HH:mm"),
      },
      {
        name: "العصر",
        time: timings.Asr,
        originalTime: moment(timings.Asr, "h:mm A").format("HH:mm"),
      },
      {
        name: "المغرب",
        time: timings.Maghrib,
        originalTime: moment(timings.Maghrib, "h:mm A").format("HH:mm"),
      },
      {
        name: "العشاء",
        time: timings.Isha,
        originalTime: moment(timings.Isha, "h:mm A").format("HH:mm"),
      },
    ];

    const updateCountdown = () => {
      const now = moment();
      const todayDate = moment().format("YYYY-MM-DD");

      let nextPrayer = null;
      let nextPrayerMoment = null;

      for (const prayer of prayers) {
        const prayerMoment = moment(
          `${todayDate} ${prayer.originalTime}`, // Use original 24-hour time for calculation
          "YYYY-MM-DD HH:mm"
        );

        if (now.isBefore(prayerMoment)) {
          nextPrayer = prayer;
          nextPrayerMoment = prayerMoment;
          break;
        }
      }

      if (!nextPrayer) {
        //when the loop is over
        nextPrayer = prayers[0]; //AlFajr
        //This line calculates the exact moment (date and time)
        //  of the next Fajr prayer, which will occur tomorrow.
        nextPrayerMoment = moment(
          `${moment().add(1, "days").format("YYYY-MM-DD")} ${
            nextPrayer.originalTime
          }`,
          "YYYY-MM-DD HH:mm"
        );
      }

      setNextPrayerName(nextPrayer.name);

      const diff = nextPrayerMoment?.diff(moment());
      if (diff && diff <= 0) {
        setTimer("00:00:00");
        return;
      }

      const duration = moment.duration(diff); //in milliseconds
      const hours = String(Math.floor(duration.asHours())).padStart(2, "0");
      const minutes = String(duration.minutes()).padStart(2, "0");
      const seconds = String(duration.seconds()).padStart(2, "0");

      setTimer(`${hours}:${minutes}:${seconds}`);
    };

    updateCountdown();

    const counter = setInterval(updateCountdown, 1000);
    return () => clearInterval(counter);
  }, [timings]);
  return { nextPrayerName, timer };
};
export default useNextPrayerCounter;
