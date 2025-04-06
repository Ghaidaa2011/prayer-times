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

        originalTime: moment(timings.Fajr, "h:mm A").format("HH:mm"),
      },
      {
        name: "الظهر",
        originalTime: moment(timings.Dhuhr, "h:mm A").format("HH:mm"),
      },
      {
        name: "العصر",
        originalTime: moment(timings.Asr, "h:mm A").format("HH:mm"),
      },
      {
        name: "المغرب",
        originalTime: moment(timings.Maghrib, "h:mm A").format("HH:mm"),
      },
      {
        name: "العشاء",
        originalTime: moment(timings.Isha, "h:mm A").format("HH:mm"),
      },
    ];
    //Calls updateCountdown immediately
    //  to set the initial values for nextPrayerName and timer.
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
      //*espial case for FAJR
      //If the current time is
      //  after all prayer times for today (e.g., after Isha),
      //  the loop won’t set nextPrayer, triggering this if block.
      if (!nextPrayer) {
        nextPrayer = prayers[0]; //Fajr
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

    //The effect reruns whenever timings changes
    //(e.g., when a new city’s prayer times are loaded)
  }, [timings]);

  return { nextPrayerName, timer };
};
export default useNextPrayerCounter;
