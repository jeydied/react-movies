import * as Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Box,
  Dropdown,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  Typography,
} from "@mui/joy";
import { logout } from "store/slicer/authenticationSlice";
import { MoreVert } from "@mui/icons-material";
import styles from "./header.module.css";

export const Header = () => {
  const dispatch = useDispatch();

  return (
    <Box className={styles.header}>
      <Box className={styles.content}>
        <Box className={styles.logo}>
          <Typography level="h2">
            <Link to="/">Movies App</Link>
          </Typography>
        </Box>

        <Dropdown>
          <MenuButton
            slots={{ root: IconButton }}
            slotProps={{ root: { variant: "outlined", color: "neutral" } }}
          >
            <MoreVert />
          </MenuButton>
          <Menu>
            <MenuItem key={"profile"}>My Profile</MenuItem>
            <MenuItem
              key={"logout"}
              onClick={() => {
                Cookies.default.remove("token");
                Cookies.default.remove("userId");
                dispatch(logout());
              }}
            >
              Log Out
            </MenuItem>
          </Menu>
        </Dropdown>
      </Box>
    </Box>
  );
};
