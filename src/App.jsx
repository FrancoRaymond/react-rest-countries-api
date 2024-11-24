import React,{useState, useEffect, createContext, useContext } from 'react';
import Header from './components/Header';
import CardsSection from './components/CardsSection';
import CountryDetails from './components/CountryDetails';

const AppContext = createContext();

const App = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error('Error fetching country data:', error);
      }
    };
    fetchCountries();
  }, []);
 
  return (
    <div className='max-w-[1440px] mx-auto'>
      <AppContext.Provider value={{ countries,  setSelectedCountry }}>
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
