import Weather from "./Weather";

const Country = ({ country }) => {
  return (
    <>
      <h1>{country.name.common}</h1>
      <div>Capital {country.capital}</div>
      <div>area {country.area}</div>
      <h2>Languages</h2>
      <ul>
        {Object.keys(country.languages).map((lang) => (
          <li key={lang}>{country.languages[lang]}</li>
        ))}
      </ul>
      <img src={country.flags.svg} width={250} alt="" />
      <div>
        <h2> Weather in {country.capital}</h2>
        <Weather latlng={country.capitalInfo.latlng} />
      </div>
    </>
  );
};
export default Country;
