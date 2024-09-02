// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

import { useEffect, useState } from "react";

export default function App() {
  const [query, setQuery] = useState(1);
  const [currency1, setCurrency1] = useState("EUR");
  const [currency2, setCurrency2] = useState("USD");
  const [error, setError] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(
    function () {
      async function convertCurrency() {
        setLoading(true);
        setError("");
        const response = await fetch(
          `https://api.frankfurter.app/latest?amount=${query}&from=${currency1}&to=${currency2}`
        );

        const data = await response.json();
        console.log(data);
        console.log(Object.values(data.rates)[0]);
        setOutput(data.rates[currency2]);
        setLoading(false);
      }
      if (currency1 === currency2) return setOutput(query);

      convertCurrency();
    },
    [currency1, currency2, query]
  );

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        disabled={loading}
      />
      <select
        value={currency1}
        onChange={(e) => setCurrency1(e.target.value)}
        disabled={loading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select
        value={currency2}
        onChange={(e) => setCurrency2(e.target.value)}
        disabled={loading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>
        {output} {currency2}
      </p>
    </div>
  );
}
