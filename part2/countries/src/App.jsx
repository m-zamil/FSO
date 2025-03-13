import { useEffect, useState } from "react";
import axios from "axios";
import Country from "./components/Country";
import CountryList from "./components/CountryList";

function App() {
  const [countriesData, setCountriesData] = useState([]);
  const [newCountry, setNewCountry] = useState("");
  const [countriesToShow, setCountriesToShow] = useState([]);

  useEffect(() => {
    axios.get("https://studies.cs.helsinki.fi/restcountries/api/all").then((respose) => {
      setCountriesData(respose.data);
    });
  }, []);

  const handleCountrySearch = (event) => {
    const searchTerm = event.target.value;
    setNewCountry(searchTerm);
    const newCountryList = searchTerm ? countriesData.filter((country) => country.name.common.toLowerCase().includes(searchTerm.toLowerCase())) : [];
    setCountriesToShow(newCountryList);
  };

  const showCountry = (country) => {
    setCountriesToShow([country]);
  };

  const filterCountryList =
    countriesToShow.length > 10 ? (
      "Too many matches, specify another filter"
    ) : countriesToShow.length <= 10 && countriesToShow.length > 1 ? (
      <CountryList countries={countriesToShow} showCountry={showCountry} />
    ) : countriesToShow.length === 1 ? (
      <Country country={countriesToShow[0]} />
    ) : (
      ""
    );
  return (
    <>
      <div>
        find countries <input type="text" value={newCountry} onChange={handleCountrySearch} />
      </div>
      {filterCountryList}
    </>
  );
}

export default App;
