import React from 'react';
import { useAppContext } from '../App';

const CountryCard = ({ country }) => {
  const { setSelectedCountry} = useAppContext();

  return (
    <div
      onClick={() => setSelectedCountry(country)}
      className="card rounded-md overflow-hidden h-full cursor-pointer text-wrap"
    >
      <img src={country.flags.svg} alt="" className="w-full min-h-44 h-[50vw] sm:h-[30vw] md:h-[0vw] object-cover shadow-sm shadow-gray-500" />
      <div className="p-4">
        <h3 className="text-xl mb-3 font-bold">{country.name.common}</h3>
        <div className="flex flex-col gap-1 pl-1">
          <p className="flex"><strong>Population:</strong><span className={`ml-[6px]`}>{country.population.toLocaleString('en-US')}</span></p>
          <p className="flex"><strong>Region:</strong><span className={` ml-[6px]`}>{country.region}</span></p>
          <p className="flex"><strong>Capital:</strong><span className={` ml-[6px]`}>{country.capital}</span></p>
        </div>
      </div>
    </div>
  );
};

export default CountryCard;