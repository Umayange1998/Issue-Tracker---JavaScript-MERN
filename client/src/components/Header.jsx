import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "../Redux/Slices/searchSlice";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: 8,
  border: "1px solid #E2E8F0",
  backgroundColor: "#F8FAFC",
  textAlign: "start",
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "50%",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "secondary",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    // transition: theme.transitions.create("width"),
    width: "50ch",
  },
}));

function Header() {
  const userdata = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const query = useSelector((state) => state.search.query);

  return (
    <Box
      position="relative "
      sx={{ background: "#000000", width: "85%", top: 0, right: 0 }}
    >
      <AppBar
        position="fixed"
        sx={{
          background: "#ffffff",
          width: "85%",
          ml: "15%", // push right of sidebar
        }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2, display: { xs: "flex", md: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <Search>
            <SearchIconWrapper>
              <SearchIcon sx={{ color: "#E2E8F0" }} />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search by issue title, ID or priority..."
              inputProps={{ "aria-label": "search" }}
              value={query}
              onChange={(e) => dispatch(setSearchQuery(e.target.value))}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
              }}
            >
              <Typography sx={{ color: "#000000" }}>
                {userdata.fullName}
              </Typography>
              <Typography variant="caption" sx={{ color: "#555555" }}>
                {userdata.role}
              </Typography>
            </Box>
            <IconButton sx={{ p: 0, width: 40, height: 40 }}>
              <AccountCircle sx={{ width: "40px", height: "40px" }} />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
