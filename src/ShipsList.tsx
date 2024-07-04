import { CircularProgress } from "@mui/material";
import { UIEvent } from "react";
import styles from "./ShipsList.module.scss";
import { Ship } from "./gql/graphql";

type ShipsListProps = {
  ships: Ship[];
  onLoadMore: () => void;
  loading: boolean;
};
export function ShipsList({ loading, ships, onLoadMore }: ShipsListProps) {
  const handleScroll = (event: UIEvent<HTMLDivElement>) => {
    if (
      !loading &&
      event.currentTarget.scrollTop + event.currentTarget.clientHeight >=
        event.currentTarget.scrollHeight
    ) {
      onLoadMore();
    }
  };

  return (
    <div className={styles.container} onScroll={handleScroll}>
      <h2>Chapters</h2>
      <ul className={styles.shipsList}>
        {ships.map(({ name, image }) => (
          <img key={name} src={image || ""} alt={name || ""} width={500} />
        ))}
      </ul>
      {loading && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </div>
      )}
    </div>
  );
}
