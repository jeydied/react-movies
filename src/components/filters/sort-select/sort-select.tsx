import React from "react";
import {
  Box,
  Card,
  CardContent,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/joy";
import { Grade, Whatshot } from "@mui/icons-material";
import { SortSelectProps } from "./sort-select.types";
import styles from "./sort-select.module.css";

export const SortSelect: React.FC<SortSelectProps> = ({
  type,
  onTypeChange,
}) => {
  return (
    <RadioGroup
      value={type || ""}
      onChange={(e) => onTypeChange(e.target.value)}
      className={styles.sort}
    >
      <Typography level="body-md" className={styles.title}>
        Sort by:
      </Typography>
      <Box className={styles.cards}>
        {[
          {
            name: "Popular",
            icon: <Whatshot color="warning" />,
          },
          {
            name: "Rating",
            icon: <Grade color="info" />,
          },
        ].map((item) => (
          <Card
            key={item.name}
            sx={{
              boxShadow: "none",
              "&:hover": { bgcolor: "background.level1" },
            }}
          >
            <CardContent>
              {item.icon}
              <Typography level="title-md">{item.name}</Typography>
            </CardContent>
            <Radio
              disableIcon
              overlay
              checked={type === item.name}
              variant="outlined"
              color="neutral"
              value={item.name}
              sx={{ mt: -2 }}
              slotProps={{
                action: {
                  sx: {
                    ...(type === item.name && {
                      borderWidth: 2,
                      borderColor: "var(--joy-palette-primary-outlinedBorder)",
                    }),
                    "&:hover": {
                      bgcolor: "transparent",
                    },
                  },
                },
              }}
            />
          </Card>
        ))}
      </Box>
    </RadioGroup>
  );
};
