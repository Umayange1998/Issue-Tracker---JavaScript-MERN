import { Plus } from "lucide-react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function NewIssueButton() {
  const navigate = useNavigate();
  return (
    <Button
      variant="contained"
      sx={{ borderRadius: 2 }}
      onClick={() => navigate("/new")}
    >
      <Plus />
      New Issue
    </Button>
  );
}

export default NewIssueButton;
