import { Pagination as MUIPagination } from "@mui/material";
import { PaginationProps } from "./pagination.types";
import styles from "./pagination.module.css";

export const Pagination: React.FC<PaginationProps> = ({
  page,
  count,
  onPageChange,
}) => {
  return (
    <>
      {
        <MUIPagination
          className={styles.pagination}
          count={count}
          page={page}
          onChange={(_, page) => onPageChange(page)}
          shape="rounded"
        />
      }
    </>
  );
};
