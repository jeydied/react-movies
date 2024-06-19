import * as Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "store/slicer/authenticationSlice";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Sheet,
  Link,
  Typography,
  Box,
  Alert,
  IconButton,
} from "@mui/joy";
import { Close, Report } from "@mui/icons-material";
import { MOVIES_APP_ACCESS_TOKEN } from "constants/tokens";
import { IS_EMPTY_STRING } from "lib/condition";
import { ALERT_DELAY } from "constants/numbers";
import { authentication } from "lib/service";
import styles from "./authorization.module.css";

export const Authorization = () => {
  const [token, setToken] = useState<string>(MOVIES_APP_ACCESS_TOKEN);
  const [error, setError] = useState<string>("");
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [isFormDisabled, setIsFormDisabled] = useState<boolean>(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAlert(false);
    }, ALERT_DELAY);

    return () => clearTimeout(timer);
  }, [showAlert]);

  const handleDismiss = () => {
    setShowAlert(false);
  };

  return (
    <Box className={styles.authorizationContainer}>
      <Sheet className={styles.authorization} variant="outlined">
        <Box className={styles.header}>
          <Typography level="h4" component="h1">
            <b>Welcome!</b>
          </Typography>
          <Typography level="body-sm">Sign in to continue.</Typography>
        </Box>
        {showAlert && (
          <Alert
            sx={{ alignItems: "flex-start" }}
            startDecorator={<Report />}
            variant="soft"
            color={"danger"}
            endDecorator={
              <IconButton
                variant="soft"
                color={"danger"}
                onClick={handleDismiss}
              >
                <Close />
              </IconButton>
            }
          >
            <div>
              <div>Error</div>
              <Typography level="body-sm" color={"danger"}>
                {error}
              </Typography>
            </div>
          </Alert>
        )}
        <FormControl
          component={"form"}
          disabled={isFormDisabled}
          onSubmit={async (e) => {
            e.preventDefault();

            setIsFormDisabled(true);
            try {
              const response = await authentication(token);
              Cookies.default.set("token", response.token);
              Cookies.default.set("userId", response.data.id.toString());
              dispatch(login());
            } catch (error) {
              setIsFormDisabled(false);
              setError(error as string);
              setShowAlert(true);
            }
          }}
        >
          <FormLabel>Token</FormLabel>
          <Input
            name="token"
            placeholder="Your token"
            onChange={(e) => setToken(e.target.value)}
            color={error ? "danger" : "neutral"}
            defaultValue={token}
          />
          <Button
            type="submit"
            disabled={IS_EMPTY_STRING(token) || isFormDisabled}
            sx={{ mt: 2 }}
          >
            Login
          </Button>
        </FormControl>
        <Typography
          endDecorator={<Link>Sign Up</Link>}
          fontSize="sm"
          className={styles.link}
        >
          Don't have an account?
        </Typography>
      </Sheet>
    </Box>
  );
};
