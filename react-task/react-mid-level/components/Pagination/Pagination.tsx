"use client";

import { FC } from "react";
import styles from "./Pagination.module.css";

type PaginationControlsProps = {
  hasNextPage: boolean;
  hasPrevPage: boolean;
  setCurrentPage: (value: (prevState: number) => number) => void;
};

const Pagination: FC<PaginationControlsProps> = ({
  hasNextPage,
  hasPrevPage,
  setCurrentPage,
}) => {
  return (
    <div className={styles.navigationContainer}>
      <button
        className={styles.navigationButton}
        disabled={!hasPrevPage}
        onClick={() =>
          setCurrentPage((prevState) =>
            prevState < 1 ? prevState : prevState - 1
          )
        }
      >
        Prev page
      </button>
      <div
        style={{ padding: "0 5px", display: "flex", alignItems: "center" }}
      ></div>
      <button
        className={styles.navigationButton}
        disabled={!hasNextPage}
        onClick={() => setCurrentPage((prevState) => prevState + 1)}
      >
        Next page
      </button>
    </div>
  );
};

export default Pagination;
