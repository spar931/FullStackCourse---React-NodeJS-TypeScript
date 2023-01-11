// Exercises 2.12 to 2.14
import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [countries, setCountries] = useState([]) 

  const [newFilter, setNewFilter] = useState('')

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  useEffect(() => {    
    console.log('effect')    
    axios      
      .get('https://restcountries.com/v2/all')      
      .then(response => {        
        console.log('promise fulfilled')        
        setCountries(response.data)      
      })  
    }, [])  
    console.log('render', countries.length, 'countries')

  return (
    <div>
      find countries <input onChange={handleFilterChange}/>
      <Countries countries={countries} search={newFilter}/>
    </div>
  );
}


const Countries = ({countries, search}) => {
  const filteredCountries = countries.filter(country => country.name.includes(search))

  if (filteredCountries.length === 1) {
    return (
      <div>
        <h1>{filteredCountries[0].name}</h1>
          <p>capital {filteredCountries[0].capital}</p>
          <p>area {filteredCountries[0].area}</p>

          <h3>languages:</h3>
            <ul>
              {filteredCountries[0].languages.map(language => 
                <li key={language.name}>
                  {language.name} 
                </li>
              )}
            </ul>

          <img src={filteredCountries[0].flags['svg']} width='400' height='200' alt="flag"/>
      </div>
    )
  }
  else if (filteredCountries.length < 10) {
    return (
      <div>
        {filteredCountries.map(country => 
          <li key={country.name}>
            {country.name} 
          </li>
        )}
      </div>
    )
  } 
  return (
    <div>
      <p>Too many matches, specify another filter</p>
    </div>
  )
}


export default App;
