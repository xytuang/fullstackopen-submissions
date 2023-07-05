import {useState, useEffect} from'react'
import axios from 'axios'
import Filter from './components/Filter'
import Content from './components/Content'

const App = () => {
const [filter, setNewFilter] = useState('')
const [allCountries, setAllCountries] = useState([])
const [countries, setCountries] = useState([])

useEffect(()=> {
  axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
  .then(response => {
    setAllCountries(response.data)
  })
}, [])

const handleChange = (event) => {
  setNewFilter(event.target.value)
  const txt = filter.toLowerCase();
  const filteredCountries = allCountries.filter(country => country.name.common.includes(txt))
  setCountries(filteredCountries)
  console.log(countries)
}

  return (
    <div>
    <Filter filter={filter} handleChange={handleChange}/>
    <Content countries={countries}/>
    </div>
    
  )
}

export default App;
