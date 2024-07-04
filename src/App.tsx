import { gql, useQuery } from "@apollo/client";
import "./App.css";
import { ShipsList } from "./ShipsList";
import { GetShipsQuery, Ship } from "./gql/graphql";

const FEED_QUERY = gql`
  query GetShips($offset: Int, $limit: Int) {
    ships(offset: $offset, limit: $limit) {
      id
      model
      name
      type
      image
      status
    }
  }
`;

function App() {
  const { loading, data, fetchMore } = useQuery<GetShipsQuery>(FEED_QUERY, {
    variables: {
      offset: 0,
      limit: 10,
    },
    notifyOnNetworkStatusChange: true,
  });
  const items = (data?.ships as Ship[]) || [];

  return (
    <div>
      <ShipsList
        loading={loading}
        ships={items}
        onLoadMore={() => {
          console.log("fetch");
          fetchMore({
            variables: { offset: items?.length || 0, limit: 10 },
            updateQuery: (prev, { fetchMoreResult }) => {
              if (!fetchMoreResult) return prev;
              return {
                ...prev,
                ships: [
                  ...(prev?.ships || []),
                  ...(fetchMoreResult?.ships || []),
                ],
              };
            },
          });
        }}
      />
    </div>
  );
}

export default App;
