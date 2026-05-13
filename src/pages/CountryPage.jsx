import { useParams, useNavigate } from "react-router-dom";
import useCountry from "../hooks/useCountry";

function CountryPage() {
  const { code } = useParams();
  const navigate = useNavigate();

  const { country, loading, error } = useCountry(code);

  if (loading) return <p className="page-status">Loading...</p>;

  if (error) return <p className="page-status page-status--error">{error}</p>;

  if (!country) return null;

  const {
    name,
    flags,
    population,
    region,
    subregion,
    capital,
    languages,
    currencies,
    borders,
  } = country;

  const languageList = languages
    ? Object.values(languages)
    : [];

  const currencyList = currencies
    ? Object.values(currencies).map((c) => c.name)
    : [];

  return (
    <div className="country-page">
      <button onClick={() => navigate(-1)} className="back-btn">
        ← Back
      </button>

      <div className="country-page__layout">
        <img
          src={flags.svg}
          alt={name.common}
          className="country-page__flag"
        />

        <div className="country-page__info">
          <h2 className="country-page__name">{name.common}</h2>

          <p className="country-page__official">
            {name.official}
          </p>

          <div className="country-page__details">
            <div>
              <p><b>Population:</b> {population.toLocaleString()}</p>
              <p><b>Region:</b> {region}</p>
              <p><b>Subregion:</b> {subregion}</p>
              <p><b>Capital:</b> {capital?.[0] ?? "N/A"}</p>
            </div>

            <div>
              <p><b>Languages:</b> {languageList.join(", ")}</p>
              <p><b>Currencies:</b> {currencyList.join(", ")}</p>
            </div>
          </div>

          {borders?.length > 0 && (
            <div>
              <p><b>Borders:</b></p>
              {borders.map((b) => (
                <span key={b} className="border-badge">
                  {b}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CountryPage;
