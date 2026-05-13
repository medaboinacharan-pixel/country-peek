import { Link } from "react-router-dom";
import { useFavourites } from "../context/FavouritesContext";

function CountryCard({ country }) {
  const { name, flags, population, region, capital, cca3 } = country;
  const { favourites, dispatch } = useFavourites();

  const isSaved = favourites.some((f) => f.cca3 === cca3);

  return (
    <Link to={`/country/${cca3}`} className="card">
      <img
        src={flags.svg}
        alt={name.common}
        className="card__flag"
      />

      <div className="card__body">
        <h3 className="card__name">{name.common}</h3>

        <p>
          <span>Population:</span>{" "}
          {population.toLocaleString()}
        </p>

        <p>
          <span>Region:</span> {region}
        </p>

        <p>
          <span>Capital:</span> {capital?.[0] ?? "N/A"}
        </p>

        <button
          className={`fav-btn ${isSaved ? "fav-btn--saved" : ""}`}
          onClick={(e) => {
            e.stopPropagation();

            if (isSaved) {
              dispatch({
                type: "REMOVE_FAVOURITE",
                payload: cca3,
              });
            } else {
              dispatch({
                type: "ADD_FAVOURITE",
                payload: country,
              });
            }
          }}
        >
          {isSaved ? "♥ Saved" : "♡ Save"}
        </button>
      </div>
    </Link>
  );
}

export default CountryCard;
