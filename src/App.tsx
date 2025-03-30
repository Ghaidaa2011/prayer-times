import { Divider } from "@mui/material";
import Header from "./components/Header";
import Container from "@mui/material/Container";
import Main from "./components/Main";
import SelectCity from "./components/SelectCity";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { ITimings } from "./types/timings.types";
import moment from "moment/min/moment-with-locales";
function App() {
  moment.locale("ar-ly");

  const [selectedCity, setSelectCity] = useState({
    displayName: "القاهرة",
    apiName: "Cairo", // Default to Cairo for initial load
  });
  const selectCity = useCallback(
    (city: { displayName: string; apiName: string }) => {
      setSelectCity(city);
    },
    []
  );

  const [timings, setTimings] = useState<ITimings>({
    Fajr: "",
    Sunrise: "",
    Dhuhr: "",
    Asr: "",
    Maghrib: "",
    Isha: "",
  });

  useEffect(() => {
    const getTimings = async () => {
      try {
        const response = await axios.get(
          `https://api.aladhan.com/v1/timingsByCity?country=EG&city=${selectedCity.apiName}`
        );
        const apiTimings = response.data.data.timings;
        // Convert 24-hour format to 12-hour format with Arabic AM/PM
        const convertedTimings = {
          Fajr: moment(apiTimings.Fajr, "HH:mm").format("h:mm A"),
          Sunrise: moment(apiTimings.Sunrise, "HH:mm").format("h:mm A"),
          Dhuhr: moment(apiTimings.Dhuhr, "HH:mm").format("h:mm A"),
          Asr: moment(apiTimings.Asr, "HH:mm").format("h:mm A"),
          Maghrib: moment(apiTimings.Maghrib, "HH:mm").format("h:mm A"),
          Isha: moment(apiTimings.Isha, "HH:mm").format("h:mm A"),
        };
        setTimings(convertedTimings);
      } catch (error) {
        console.error("Error fetching prayer timings with axios:", error);
      }
    };
    getTimings();
  }, [selectedCity]);

  const [todayDate, setTodayDate] = useState("");
  useEffect(() => {
    const updateTime = () => {
      setTodayDate(moment().format("MMMM Do YYYY | h:mm a"));
    };
    updateTime();
    const intervalId = setInterval(updateTime, 1000);
    return () => clearInterval(intervalId);
  }, []);

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
      const today = moment().format("YYYY-MM-DD");

      let nextPrayer = null;
      let nextPrayerMoment = null;

      for (const prayer of prayers) {
        const prayerMoment = moment(
          `${today} ${prayer.originalTime}`, // Use original 24-hour time for calculation
          "YYYY-MM-DD HH:mm"
        );
        if (now.isBefore(prayerMoment)) {
          nextPrayer = prayer;
          nextPrayerMoment = prayerMoment;
          break;
        }
      }

      if (!nextPrayer) {
        nextPrayer = prayers[0];
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

      const duration = moment.duration(diff);
      const hours = String(Math.floor(duration.asHours())).padStart(2, "0");
      const minutes = String(duration.minutes()).padStart(2, "0");
      const seconds = String(duration.seconds()).padStart(2, "0");

      setTimer(`${hours}:${minutes}:${seconds}`);
    };

    updateCountdown();
    const counter = setInterval(updateCountdown, 1000);

    return () => clearInterval(counter);
  }, [timings]);

  return (
    <Container maxWidth="lg">
      <Header
        selectedCity={selectedCity.displayName}
        todayDate={todayDate}
        nextPrayerName={nextPrayerName}
        timer={timer}
      />
      <Divider
        variant="fullWidth"
        sx={{ borderColor: "white", opacity: "0.1" }}
      />
      <Main timings={timings} />
      <SelectCity selectCity={selectCity} />
    </Container>
  );
}

export default App;
