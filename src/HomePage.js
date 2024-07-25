import React, { useEffect, useState } from "react";

function HomePage() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [cities, setCities] = useState([]);
  const [city, setCity] = useState("");

  const dropdowns = {
    padding:"5px",
    margin:"10px"
  }

  const getCountries = async () => {
    try{
        const response = await fetch(
            "https://crio-location-selector.onrender.com/countries"
          );
          const data = await response.json();
          setCountries(data);

    }catch(err){
        console.error("Error while fetching countries",err);

    }
   
  };

  const getStates = async (country) => {
    try{
        const response = await fetch(
            `https://crio-location-selector.onrender.com/country=${country}/states`
          );
          const data = await response.json();
          setStates(data);
    }catch(err){
        console.error("Error while fetching states",err);

    }
   
  };

  const getCities = async (country, state) => {
    try{
        const response = await fetch(
            `https://crio-location-selector.onrender.com/country=${country}/state=${state}/cities`
          );
          const data = await response.json();
          setCities(data);

    }catch(err){
console.error("Error while fetching cities",err);
    }
   
  };

  useEffect(() => {
    getCountries();
  }, []);

  useEffect(() => {
    if(country){
      getStates(country);
    }
  }, [country]);

  useEffect(() => {
    if(country && state){
      getCities(country, state);
    }
  }, [country, state]);

  return (
    <div>
      <h1>Select Location</h1>
      <select onChange={(e) => setCountry(e.target.value)} value={country} style={dropdowns}>
        <option value="" disabled>Select Country</option>
        {countries.map((country) => {
          return <option key={country} value={country}>{country}</option>;
        })}
      </select>

      <select
        onChange={(e) => setState(e.target.value)}
        value={state}
        disabled={country ? false : true}
        style={dropdowns}
      >
        <option value="" disabled>Select State</option>
        {states.map((state) => {
          return <option key={state} value={state}>{state}</option>;
        })}
      </select>

      <select
        onChange={(e) => setCity(e.target.value)}
        value={city}
        disabled={state ? false : true}
        style={dropdowns}
      >
        <option value="" disabled>Select City</option>
        {cities.map((city) => {
          return <option key={city} value={city}>{city}</option>;
        })}
      </select>

      {city && (
        <h3>
          You selected{" "}
          <span>
            <h2 style={{display:"inline-block"}}>{city}, </h2>
          </span>
          <span style={{color:"#ccc"}}>
            {state}, {country}
          </span>
        </h3>
      )}
    </div>
  );
}

export default HomePage;