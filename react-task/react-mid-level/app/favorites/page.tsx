"use client";

import DisplayMovie from "@/components/Movie";
import { useFavorites } from "@/hooks/useFavorites";
import Link from "next/link";

const FavoritesPage = (): JSX.Element => {
  const { favorites, removeFavorite } = useFavorites();

  return (
    <div>
      <div>
        <h1>Favorites</h1>
        <Link href="/">Back</Link>
      </div>
      <div>
        {favorites.map((movie, index) => (
          <DisplayMovie
            key={index}
            onFavoriteClick={removeFavorite}
            movie={movie}
            icon="❌"
          />
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;
