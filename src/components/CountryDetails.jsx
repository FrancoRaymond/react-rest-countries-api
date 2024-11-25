import React, { useState } from 'react'
import arrowDark from '../assets/arrow-back-black.svg'
import arrowLight from '../assets/icons8-back-30.png'
import { useAppContext } from '../App'

const CountryDetails = ({ country, onBack }) => {

  const {theme, countries} = useAppContext()

  function fullNameBorders(countries, country) {
    let full = [];
    
    if (Array.isArray(country.borders)) {
      countries.forEach(element => {
        if (country.borders.includes(element.cca3)) {
          full.push(element.name.common);
        }
      });
    }
    
    if (full.length === 0) {
      full.push('N/A');
    }
    
    return full;
  }
  
  return (
    <div className='countryDetails max-w-[1440px] relative w-full top-[180px] sm:top-[130px] bg-gray-50 py-7 px-4 sm:px-6 md:px-10 lg:px-20'>
      <button onClick={onBack} className='flex gap-3 shadow-sm shadow-gray-400 items-center px-5 py-2 bg-white rounded-md'>
        <img src={theme === 'dark' ? arrowLight : arrowDark} alt="arrow back" className='w-5 h-5' />
        <span>Back</span>
      </button>

      <div className='mt-7 flex flex-col gap-5 md:flex-row lg:items-center lg:justify-between'>
        <img 
          src={country.flags.svg} 
          alt={`${country.cca3} flag`} 
          className='w-full max-w-lg h-[50vw] md:h-[25vw] md:w-1/2 min-h-[180px] object-cover'
        />

        <div className='flex flex-col gap-5 mt-5 lg:mt-0 lg:w-1/2'>
          <h3 className='text-2xl font-bold'>{country.name.common}</h3>

          <div className='flex flex-col gap-5 lg:flex-row lg:justify-between'>
            <div className='flex flex-col gap-2'>
              <span className='flex'><strong>Native Name:</strong><span className='text-gray-600 ml-2'>{country.translations?.nld?.common || 'N/A'}</span></span>
              <span className='flex'><strong>Population:</strong><span className='text-gray-600 ml-2'>{country.population.toLocaleString('en-US')}</span></span>
              <span className='flex'><strong>Region:</strong><span className='text-gray-600 ml-2'>{country.region}</span></span>
              <span className='flex'><strong>Sub-region:</strong><span className='text-gray-600 ml-2'>{country.subregion}</span></span>
              <span className='flex'><strong>Capital:</strong><span className='text-gray-600 ml-2'>{country.capital}</span></span>
            </div>

            <div className='flex flex-col gap-2 mt-5 lg:mt-0'>
              <span className='flex'><strong>Top Level Domain:</strong><span className='text-gray-600 ml-2'>{country.tld?.[0] || 'N/A'}</span></span>
              <span className='flex'><strong>Currencies:</strong><span className='text-gray-600 ml-2'>{Object.values(country.currencies || {}).map(currency => currency.name).join(', ') || 'N/A'}</span></span>
              <span className='flex'><strong>Languages:</strong><span className='text-gray-600 ml-2'>{Object.values(country.languages || {}).join(', ') || 'N/A'}</span></span>
            </div>
          </div>

          <span className="flex flex-wrap items-center gap-2 mt-5">
            <strong className="mr-2">Borders:</strong>
            {(fullNameBorders(countries, country) || []).map((border) => (
              <span key={border} className="shadow-md shadow-gray-500 px-3 py-1 rounded-md text-gray-600">{border}</span>
            ))}
          </span>
        </div>
      </div>
    </div>
  )
}

export default CountryDetails
