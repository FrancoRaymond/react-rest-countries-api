import React from 'react';
import CountryCard from './CountryCard';
import { useAppContext } from '../App';

const CardsSection = () => {
  const { countries } = useAppContext();

  return (
    <div className={`cardSection mt-[180px] sm:mt-[130px] px-2 sm:px-4 md:px-10 lg:px-20 pt-2 pb-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6`} >
      {countries.map(country => (
        <CountryCard key={country.cca3} country={country} />
      ))}
    </div> 
  );
};

export default CardsSection;
