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
  )
}


const Countries = ({countries, search}) => {
  const filteredCountries = countries.filter(country => country.name.includes(search))

  const [showData, setShowData] = useState(false)
  const [SelectedCountry, setCountry] = useState(countries[0])

  const ButtonClick = (country) => {
    setShowData(true)
    setCountry(country)
  }
  
  if (showData === true) {
    return (
      <CountryData country={SelectedCountry} />
    )
  } else if (filteredCountries.length < 10) {
    return (
      <div>
        {filteredCountries.map(country => 
          <li key={country.name}>
            {country.name}<button onClick={() => ButtonClick(country)}>show</button>
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


const CountryData = ({country}) => {
  return (
    <div>
      <h1>{country.name}</h1>
        <p>capital {country.capital}</p>
        <p>area {country.area}</p>

        <h3>languages:</h3>
          <ul>
            {country.languages.map(language => 
              <li key={language.name}>
                {language.name} 
              </li>
            )}
          </ul>

        <img src={country.flags['svg']} width='400' height='200' alt="flag"/>
    </div>
  )
}


export default App;
