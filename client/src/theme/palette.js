// src/theme/palette.js

const PRIMARY = {
  main: "#2563EB",
  contrastText: "#ffffff",
};

const SECONDARY = {
  main: "#F59E0B",
  contrastText: "#000000",
};

const INFO = {
  main: "#1890FF",
  contrastText: "#ffffff",
};

const SUCCESS = {
  main: "#10B981",
  dark: "#229A16",
  contrastText: "#000000",
};

const WARNING = {
  main: "#F77F00",
  contrastText: "#000000",
};

const ERROR = {
  main: "#D62828",
  contrastText: "#ffffff",
};
const CLOSED = {
  main: "#6366F1",
  contrastText: "#ffffff",
};
const URGENT = {
  main: "#9c1414",
  contrastText: "#ffffff",
};

const palette = {
  mode: "light",

  primary: PRIMARY,
  secondary: SECONDARY,
  info: INFO,
  success: SUCCESS,
  warning: WARNING,
  error: ERROR,
  closed: CLOSED,
  urgent: URGENT,

  background: {
    default: "#F8FAFC",
    paper: "#ffffff",
  },

  text: {
    primary: "#000000",
    secondary: "#555555",
  },
};

export default palette;
