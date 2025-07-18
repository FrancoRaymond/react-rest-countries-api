import React from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../App';


const CardsSection = () => {
  const { filteredCountries } = useAppContext();

  return (
    <div className={`cardSection mt-[180px] sm:mt-[130px] px-2 sm:px-4 md:px-10 lg:px-20 pt-2 pb-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6`} >
      {filteredCountries.map(country => (
        <Link 
        to={`/country/${country.name.common}`}
        state={{ country }}
        className="card rounded-md overflow-hidden h-full cursor-pointer text-wrap"
        key={country.cca3}
      >
        <img
          src={country.flags["png"]}
          alt={country.name.common} 
          className="w-full min-h-44 h-[50vw] sm:h-[30vw] md:h-[0vw] object-cover shadow-sm shadow-gray-500" 
        />
        <div className="p-4">
          <h3 className="text-xl mb-3 font-bold">{country.name.common}</h3>
          <div className="flex flex-col gap-1 pl-1">
            <p className="flex"><strong>Population:</strong><span className={`ml-[6px]`}>{country.population.toLocaleString('en-US')}</span></p>
            <p className="flex"><strong>Region:</strong><span className={` ml-[6px]`}>{country.region}</span></p>
            <p className="flex"><strong>Capital:</strong><span className={` ml-[6px]`}>{country.capital.join(", ")}</span></p>
          </div>
        </div>
      </Link>
      ))}
    </div> 
  );
};

export default CardsSection;