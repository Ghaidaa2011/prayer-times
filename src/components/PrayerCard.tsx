import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { TPrayer } from "../types/prayer.types";

const PrayerCard = ({ name, time, image }: TPrayer) => {
  return (
    <Card
      sx={{
        width: 180,
        direction: "rtl",
        boxShadow: "3px 3px 3px 3px rgba(0,0,0,0.5)",
        borderRadius: "10px",
      }}
      style={{ marginBottom: "3vh" }}
    >
      <CardActionArea>
        <CardMedia component="img" height="140" image={image} alt={name} />
        <CardContent>
          <Typography gutterBottom variant="h5">
            {name}
          </Typography>
          <Typography variant="h4" color="text.secondary">
            {time}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
export default PrayerCard;
