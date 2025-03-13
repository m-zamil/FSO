const CountryList = ({ countries, showCountry }) => {
  return countries.map((country) => (
    <div key={country.name.common}>
      {country.name.common}
      <button onClick={() => showCountry(country)}>show</button>
    </div>
  ));
};

export default CountryList;
