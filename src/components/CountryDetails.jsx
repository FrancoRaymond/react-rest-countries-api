import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import arrowDark from '../assets/arrow-back-black.svg'
import arrowLight from '../assets/icons8-back-30.png'
import { useAppContext } from '../App'

const CountryDetails = () => {
  const { theme, filteredCountries } = useAppContext()
  const location = useLocation();
  const country = location.state?.country;
  const navigate = useNavigate();

  function fullNameBorders(filteredCountries, country) {
    let full = []; 
    if (Array.isArray(country.borders)) {
      filteredCountries.forEach(element => {
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

  const nativeName = country.name.nativeName && Object.values(country.name.nativeName)[0]?.common;

  return (
    <div className='countryDetails max-w-[1440px] relative w-full top-[54px] sm:top-[58px] bg-gray-50 py-4 px-4 sm:px-6 md:px-10 lg:px-20 z-50'>
      <button onClick={() => navigate(-1)} className='flex gap-3 shadow-sm shadow-gray-400 items-center px-5 py-1 bg-white rounded-md'>
        <img src={theme === 'dark' ? arrowLight : arrowDark} alt="arrow back" className='w-5 h-5' />
        <span>Back</span>
      </button>
      <div className='mt-7 flex flex-col gap-5 md:flex-row lg:items-center lg:justify-between'>
        <img 
          src={country.flags["png"]} 
          alt={`${country.cca3} flag`} 
          className='w-full max-w-lg h-[50vw] md:h-[25vw] md:w-1/2 min-h-[180px] object-cover'
        />
        <div className='flex flex-col gap-5 mt-5 lg:mt-0 lg:w-1/2'>
          <h3 className='text-2xl font-bold'>{country.name.common}</h3>
          <div className='flex flex-col gap-5 lg:flex-row lg:justify-between'>
            <div className='flex flex-col gap-2'>
              <span className='flex'><strong>Native Name:</strong><span className='text-gray-600 ml-2'>{ nativeName || country.name.common || 'N/A'}</span></span>
              <span className='flex'><strong>Population:</strong><span className='text-gray-600 ml-2'>{country.population.toLocaleString('en-US')}</span></span>
              <span className='flex'><strong>Region:</strong><span className='text-gray-600 ml-2'>{country.region}</span></span>
              <span className='flex'><strong>Sub-region:</strong><span className='text-gray-600 ml-2'>{country.subregion}</span></span>
              <span className='flex'><strong>Capital:</strong><span className='text-gray-600 ml-2'>{country.capital.join(", ")}</span></span>
            </div>
            <div className='flex flex-col gap-2 mt-5 lg:mt-0'>
              <span className='flex'><strong>Top Level Domain:</strong><span className='text-gray-600 ml-2'>{country.tld?.[0] || 'N/A'}</span></span>
              <span className='flex'><strong>Currencies:</strong><span className='text-gray-600 ml-2'>{Object.values(country.currencies || {}).map(currency => currency.name).join(', ') || 'N/A'}</span></span>
              <span className='flex'><strong>Languages:</strong><span className='text-gray-600 ml-2'>{Object.values(country.languages || {}).join(', ') || 'N/A'}</span></span>
            </div>
          </div>
          <span className="flex flex-wrap items-center gap-2 mt-5">
            <strong className="mr-2">Borders:</strong>
            {(fullNameBorders(filteredCountries, country) || []).map((border) => (
              <span key={border} className="shadow-md shadow-gray-500 px-3 py-1 rounded-md text-gray-600">{border}</span>
            ))}
          </span>
        </div>
      </div>
    </div>
  )
}

export default CountryDetails