import { Typography } from "@mui/joy";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import styles from "./not-found.module.css";

export const NotFound = () => {
  return (
    <Box className={styles.notFound}>
      <Typography level="h1">
        404: Oops! We can't find the page you're looking for
      </Typography>
      <Typography level="body-md" mt={2}>
        Maybe you want to{" "}
        <Link to={"/"} style={{ textDecoration: "underline" }}>
          go back?
        </Link>
      </Typography>
    </Box>
  );
};
