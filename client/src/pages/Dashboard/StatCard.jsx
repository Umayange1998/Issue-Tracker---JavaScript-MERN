import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

function StatCard({ title, color, amount }) {
  return (
    <Card>
      <CardContent sx={{ py: 1, px: 3 }}>
        <Typography
          variant="h6"
          sx={{
            color: color,
            fontFamily: "Poppins",
            fontWeight: 600,
          }}
        >
          {title}
        </Typography>

        <Typography
          variant="h4"
          sx={{ color: "text.primary", fontWeight: "bold" }}
        >
          {amount}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default StatCard;
