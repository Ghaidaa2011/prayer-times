import Grid from "@mui/material/Unstable_Grid2";
interface IHeaderProps {
  selectedCity: string;
  todayDate: string;
  nextPrayerName: string;
  timer: string;
}
const Header = ({
  selectedCity,
  todayDate,
  nextPrayerName,
  timer,
}: IHeaderProps) => {
  return (
    <Grid container spacing={2} sx={{ padding: "5vh 0px" }}>
      <Grid xs={6}>
        <h2>{todayDate}</h2>
        <h1>{selectedCity}</h1>
      </Grid>
      <Grid xs={6}>
        <h2>متبقي حتي صلاة {nextPrayerName}</h2>
        <h1>{timer}</h1>
      </Grid>
    </Grid>
  );
};
export default Header;
