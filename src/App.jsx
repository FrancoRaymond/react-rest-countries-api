import React, { useState, useEffect, createContext, useContext } from 'react';
import Header from './components/Header';
import CardsSection from './components/CardsSection';
import CountryDetails from './components/CountryDetails';

const AppContext = createContext();

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  
  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme])

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();
        setCountries(data);
        setFilteredCountries(data);
      } catch (error) {
        console.error('Error fetching country data:', error);
      }
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    const filtered = countries.filter((country) => {
      const matchesSearch = country.name.common.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRegion = selectedRegion ? country.region === selectedRegion : true;
      return matchesSearch && matchesRegion;
      
    });
    setFilteredCountries(filtered);
  }, [searchTerm, selectedRegion, countries]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [selectedCountry]);

  return (
    <div className='max-w-[1440px] mx-auto'>
      <AppContext.Provider value={{ countries, filteredCountries, searchTerm, setSearchTerm, selectedRegion, setSelectedRegion, setSelectedCountry, toggleTheme, theme }}>
        <Header />
        {selectedCountry ? (
          <CountryDetails country={selectedCountry} onBack={() => setSelectedCountry(null)} />
        ) : (
          <CardsSection />
        )}
      </AppContext.Provider>
    </div>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};

export default App;
