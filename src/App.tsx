import { Divider } from "@mui/material";
import Header from "./components/Header";
import Container from "@mui/material/Container";
import Main from "./components/Main";
import SelectCity from "./components/SelectCity";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { ITimings } from "./types/timings.types";
import moment from "moment/min/moment-with-locales";
import useNextPrayerCounter from "./hooks/useNextPrayerCounter";
function App() {
  moment.locale("ar-ly");

  const [selectedCity, setSelectCity] = useState({
    displayName: "القاهرة",
    apiName: "Cairo",
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
        // // Convert 24-hour format to 12-hour format with Arabic AM/PM
        // const convertedTimings = {
        //   Fajr: moment(apiTimings.Fajr, "HH:mm").format("h:mm A"),
        //   Sunrise: moment(apiTimings.Sunrise, "HH:mm").format("h:mm A"),
        //   Dhuhr: moment(apiTimings.Dhuhr, "HH:mm").format("h:mm A"),
        //   Asr: moment(apiTimings.Asr, "HH:mm").format("h:mm A"),
        //   Maghrib: moment(apiTimings.Maghrib, "HH:mm").format("h:mm A"),
        //   Isha: moment(apiTimings.Isha, "HH:mm").format("h:mm A"),
        // };
        // setTimings(convertedTimings);
        setTimings(apiTimings);
      } catch (error) {
        console.error("Error fetching prayer timings with axios:", error);
      }
    };
    getTimings();
  }, [selectedCity]);

  const [todayDateTime, setTodayDateTime] = useState("");
  useEffect(() => {
    const updateTime = () => {
      setTodayDateTime(moment().format("Do MMMM YYYY | h:mm a"));
    };
    updateTime();
    const intervalId = setInterval(updateTime, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const { nextPrayerName, timer } = useNextPrayerCounter(timings);

  return (
    <Container maxWidth="lg">
      <Header
        selectedCity={selectedCity.displayName}
        todayDate={todayDateTime}
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
