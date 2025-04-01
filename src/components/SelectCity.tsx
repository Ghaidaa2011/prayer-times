import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { memo, useState } from "react";
import { Stack } from "@mui/material";

interface ISelectedCity {
  selectCity: (city: { displayName: string; apiName: string }) => void;
}
const SelectCity = memo(({ selectCity }: ISelectedCity) => {
  const availableCities = [
    {
      displayName: "القاهرة",
      apiName: "Cairo",
    },
    {
      displayName: "الأسكندرية",
      apiName: "Alexandria",
    },
    {
      displayName: "الشرقية",
      apiName: "Ash Sharqiyah",
    },
    {
      displayName: "أسوان",
      apiName: "Aswan",
    },
  ];
  const [city, setCity] = useState({
    displayName: "القاهرة",
    apiName: "Cairo",
  });
  const handleChange = (event: SelectChangeEvent) => {
    const selectedCityobject = availableCities.find(
      (city) => city.apiName === event.target.value
    );
    if (selectedCityobject) {
      setCity(selectedCityobject);
      selectCity(selectedCityobject);
    }
  };
  const menuItemsList = availableCities.map((city) => (
    <MenuItem key={city.displayName} value={city.apiName}>
      {city.displayName}
    </MenuItem>
  ));
  return (
    <Stack
      direction={"row"}
      justifyContent={"center"}
      sx={{ marginBottom: "5vh" }}
    >
      <FormControl sx={{ width: { xs: "70%", sm: "50%", md: "30%" } }}>
        <InputLabel
          id="demo-simple-select-label"
          sx={{
            color: "white",
            "&.Mui-focused": { color: "white" },
            "&.MuiFormLabel-filled": { color: "white" },
          }}
        >
          المدينة
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={city.apiName}
          label="المدينة"
          onChange={handleChange}
          sx={{
            color: "white",
            ".MuiOutlinedInput-notchedOutline": {
              borderColor: "white",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "white",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "white",
            },
            ".MuiSvgIcon-root": {
              color: "white",
            },
          }}
          MenuProps={{
            PaperProps: {
              sx: {
                "& .MuiMenuItem-root": {
                  color: "white",
                },
                "& .MuiMenuItem-root.Mui-selected": {
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  color: "white",
                },
                "& .MuiMenuItem-root:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                },
                "& .MuiMenuItem-root.Mui-selected:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.3)",
                },
                backgroundColor: "#191b1f",
              },
            },
          }}
        >
          {menuItemsList}
        </Select>
      </FormControl>
    </Stack>
  );
});
export default SelectCity;
