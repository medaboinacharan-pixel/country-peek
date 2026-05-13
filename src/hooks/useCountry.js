import { useState, useEffect } from "react";

function useCountry(code) {
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!code) return;

    const fetchCountry = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          `https://restcountries.com/v3.1/alpha/${code}`
        );

        if (!res.ok) {
          throw new Error("Country not found");
        }

        const data = await res.json();

        setCountry(data[0]);
      } catch (err) {
        setError(err.message);
        setCountry(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCountry();
  }, [code]);

  return { country, loading, error };
}

export default useCountry;
