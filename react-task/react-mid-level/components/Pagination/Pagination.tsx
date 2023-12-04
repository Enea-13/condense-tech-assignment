"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FC } from "react";
import styles from "./Pagination.module.css";

type PaginationControlsProps = {
  totalItems: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

const Pagination: FC<PaginationControlsProps> = ({
  totalItems,
  hasNextPage,
  hasPrevPage,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const offset = searchParams.get("offset") ?? "1";
  const limit = searchParams.get("limit") ?? "10";

  return (
    <div className={styles.paginationContainer}>
      {/* TODO: dropdown component */}
      <div className={""}>
        <button
          className={styles.limitPerView}
          onClick={() => {
            router.push(`/?limit=${limit}&offset=${Number(offset) - 1}`);
          }}
        >
          View per page
        </button>
      </div>
      <div className={styles.navigationContainer}>
        <button
          className={styles.navigationButton}
          disabled={!hasPrevPage}
          onClick={() => {
            router.push(`/?limit=${limit}&offset=${Number(offset) - 1}`);
          }}
        >
          Prev page
        </button>
        <div
          style={{ padding: "0 5px", display: "flex", alignItems: "center" }}
        >
          {offset} / {Math.ceil(Number(totalItems) / Number(limit))}
        </div>
        <button
          className={styles.navigationButton}
          disabled={!hasNextPage}
          onClick={() => {
            router.push(`/?limit=${limit}&offset=${Number(offset) + 1}`);
          }}
        >
          Next page
        </button>
      </div>
    </div>
  );
};

export default Pagination;
