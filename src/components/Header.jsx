import React from 'react';
import Dark from '../assets/black moon.png';
import Light from '../assets/light moon.png'
import searchdark from '../assets/search.png';
import searchlight from '../assets/icons-search-light.svg';
import { useAppContext } from '../App';

const Header = () => {
  const { searchTerm, setSearchTerm, selectedRegion, setSelectedRegion, toggleTheme, theme } = useAppContext();

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleRegionChange = (e) => {
    setSelectedRegion(e.target.value);
  };

  return (
    <div className="fixed top-0 w-full z-30 max-w-[1440px]">
      <div className="header1 relative z-40 shadow-sm  flex justify-between px-2 py-3 sm:px-4 md:px-10 lg:px-20">
        <h1 className="font-bold text-lg md:text-2xl">Where in the world?</h1>
        <div 
          onClick={toggleTheme}
          className="flex items-center gap-1 cursor-pointer"
        >
          <img
            src={theme === 'light' ? Dark : Light}
            alt="Theme toggle"
            className="w-4 h-4 cursor-pointer transition-all duration-300 ease-in-out"
          />
          <span className="transition-opacity duration-300 ease-in-out">{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
        </div>
      </div>
      <div className="header2 relative z-10 px-2 py-3 sm:px-4 sm:flex sm:items-center sm:justify-between md:px-10 lg:px-20">
        <div className="flex gap-3 items-center rounded-md outline-none p-2 my-2 grow max-w-96 sm:px-4">
          <img
            src={theme === 'dark' ? searchlight : searchdark}
            alt="Search icon"
            className="w-6 h-6"
          />
          <input
            name="searchCountry"
            value={searchTerm}
            onChange={handleSearchChange}
            type="text"
            placeholder="Search for a country..."
            className="outline-none"
            autoComplete='off'
          />
        </div>
        <select
          name='region'
          autoComplete='off'
          value={selectedRegion}
          onChange={handleRegionChange}
          className={`py-2 px-4 outline-none rounded-md mt-3 sm:mt-0 overflow-hidden transition-all duration-300 ease-in-out`}
        >
          <option value="">Filter by region</option>
          <option value="Africa">Africa</option>
          <option value="Americas">America</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
      </div>
    </div>
  );
};

export default Header;